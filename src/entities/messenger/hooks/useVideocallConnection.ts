/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStatus } from '@/entities/auth';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client/dist/sockjs';
import { TokenService } from '@/shared/api/services';

const headers = {
  Authorization: `Bearer ${TokenService.get()?.jwtToken}`,
};

const intervalTime = 1000;

const configuration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

export const useVideocallConnection = () => {
  const [isMicrophone, setMicrophone] = useState<boolean>(false);
  const [isCamera, setCamera] = useState<boolean>(false);

  const toggleMicrophone = () => {
    if (videoStream.current) {
      const audioTracks = videoStream.current.getAudioTracks();
      if (audioTracks.length > 0) {
        const firstAudioTrack = audioTracks[0];
        firstAudioTrack.enabled = !isMicrophone;
        setMicrophone(prev => !prev);
      }
    }
  };

  const toggleCamera = () => {
    if (videoStream.current) {
      const videoTracks = videoStream.current.getVideoTracks();
      if (videoTracks.length > 0) {
        const firstVideoTrack = videoTracks[0];
        firstVideoTrack.enabled = !isCamera;
        setCamera(prev => !prev);
      }
    }
  };

  const { id } = useParams();
  const { login } = useAuthStatus();

  const connectionInterval = useRef<any>(null);
  const stompClient = useRef<any>(null);
  const peerConnection = useRef<any>(null);

  const answerReceived = useRef<boolean>(false);
  const answerSent = useRef<boolean>(false);
  const cond = useRef<any>(null);

  const userVideo = useRef<any>(null);
  const opponentVideo = useRef<any>(null);

  const videoStream = useRef<any>(null);

  useEffect(() => {
    const pc = new RTCPeerConnection(configuration);

    pc.onicecandidate = (e: any) => {
      if (e.candidate) {
        cond.current = e.candidate;
      }
    };

    const checkAndSendCandidate = setInterval(() => {
      if (answerSent && answerReceived) {
        if (cond) {
          stompClient.current.send(
            `/app/signaling/${login}/${id}`,
            {},
            JSON.stringify({ type: 'candidate', candidate: cond })
          );
          clearInterval(checkAndSendCandidate);
        }
      }
    }, 1000);

    pc.ontrack = (e: any) => {
      opponentVideo.current.srcObject = e.streams[0];
    };

    peerConnection.current = pc;
  }, []);

  useEffect(() => {
    const socket = new SockJS('https://voice-backend.ru:9000/signaling');
    stompClient.current = Stomp.over(socket);
    const pc = peerConnection.current;

    const addMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        userVideo.current.srcObject = stream;
        videoStream.current = stream;

        stream
          .getTracks()
          .forEach((track) => peerConnection.current.addTrack(track, stream));
        stream
          .getAudioTracks()
          .forEach((track) => (track.enabled = isMicrophone));
        stream.getVideoTracks().forEach((track) => (track.enabled = isCamera));
      } catch (error) {
        console.error('Error adding media stream:', error);
      }
    };

    const createOffer = async () => {
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      stompClient.current.send(
        `/app/signaling/${login}/${id}`,
        {},
        JSON.stringify({ type: 'offer', offer })
      );
    };

    const destroyMediaStream = () => {
      if (videoStream.current) {
        videoStream.current.getTracks().forEach((track: any) => track.stop());
      }
    };

    const goVideo = async () => {
      await addMediaStream();
      connectionInterval.current = setInterval(createOffer, intervalTime);
    };

    const handleOffer = async (offer: any) => {
      await pc.setRemoteDescription(offer);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      stompClient.current.send(
        `/app/signaling/${login}/${id}`,
        {},
        JSON.stringify({ type: 'answer', answer })
      );
      answerSent.current = true;
    };

    const handleAnswer = async (answer: any) => {
      await pc.setRemoteDescription(answer);
    };

    const addIceCandidate = async (candidate: any) => {
      if (candidate.current) {
        await pc.addIceCandidate(new RTCIceCandidate(candidate.current));
      }
    };

    const subscribe = () => {
      stompClient.current.subscribe(
        `/topic/signaling/${id}/${login}`,
        (output: any) => {
          const message = JSON.parse(output.body);
          setTimeout(() => clearInterval(connectionInterval.current), 5000); // TODO + проверка 
          switch (message.type) {
            case 'offer':
              handleOffer(message.offer);
              break;
            case 'answer':
              handleAnswer(message.answer);
              answerReceived.current = true;
              break;
            case 'candidate':
              addIceCandidate(message.candidate);
              break;
          }
        }
      );
    };

    const connect = () => {
      if (!stompClient.current.connected) {
        stompClient.current.connect(headers, () => {
          subscribe();
          goVideo();
        });
      }
    };

    connect();

    return () => {
      if (connectionInterval.current) {
        clearInterval(connectionInterval.current);
      }

      peerConnection.current.close();
      stompClient.current.disconnect();
      destroyMediaStream();
    };
  }, []);

  return {
    isMicrophone,
    isCamera,
    toggleCamera,
    toggleMicrophone,
    user: login,
    opponent: id,
    userVideo,
    opponentVideo,
  };
};
