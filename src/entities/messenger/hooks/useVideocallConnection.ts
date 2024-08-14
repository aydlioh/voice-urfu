/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStatus } from '@/entities/auth';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAudioVideocall } from './useAudioVideocall';
import { StompService } from '@/shared/ws';

const intervalTime = 1000;
const disconnectTimeMs = 30 * 1000;

const configuration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

export const useVideocallConnection = () => {
  const [isMicrophone, setMicrophone] = useState<boolean>(false);
  const [isCamera, setCamera] = useState<boolean>(false);

  const navigate = useNavigate();
  const { username } = useParams();
  const { login } = useAuthStatus();

  const connectionInterval = useRef<any>(null);
  const stompClient = useRef<StompService | null>(null);
  const peerConnection = useRef<any>(null);

  const answerReceived = useRef<boolean>(false);
  const answerSent = useRef<boolean>(false);
  const cond = useRef<any>(null);

  const userVideo = useRef<any>(null);
  const friendVideo = useRef<any>(null);

  const videoStream = useRef<any>(null);

  const { startSounds, destroySounds, connectSounds } = useAudioVideocall();
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const toggleMicrophone = () => {
    if (videoStream.current) {
      const audioTracks = videoStream.current.getAudioTracks();
      if (audioTracks.length > 0) {
        const firstAudioTrack = audioTracks[0];
        firstAudioTrack.enabled = !isMicrophone;
        setMicrophone((prev) => !prev);
      }
    }
  };

  const toggleCamera = () => {
    if (videoStream.current) {
      const videoTracks = videoStream.current.getVideoTracks();
      if (videoTracks.length > 0) {
        const firstVideoTrack = videoTracks[0];
        firstVideoTrack.enabled = !isCamera;
        setCamera((prev) => !prev);
      }
    }
  };

  const handleUserConnect = () => {
    startSounds();
    closeTimeout.current = setTimeout(() => {
      if (!answerReceived.current) {
        navigate(-1);
      }
    }, disconnectTimeMs);
  };

  const handleFriendConnect = () => {
    connectSounds();
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
  };

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
          stompClient.current?.send({
            url: `/app/signaling/${login}/${username}`,
            body: { type: 'candidate', candidate: cond },
          });
          clearInterval(checkAndSendCandidate);
        }
      }
    }, 1000);

    pc.ontrack = (e: any) => {
      friendVideo.current.srcObject = e.streams[0];
      handleFriendConnect();
    };

    peerConnection.current = pc;
  }, []);

  useEffect(() => {
    stompClient.current = new StompService(
      'https://voice-backend.ru:9000/signaling',
      {
        debug: true,
        debugName: 'VIDEOCALL',
      }
    );

    const pc = peerConnection.current;

    const handleMediaCapture = async () => {
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

    const handleMediaDestroy = () => {
      if (videoStream.current) {
        videoStream.current.getTracks().forEach((track: any) => track.stop());
      }
    };

    const handleOfferCreate = async () => {
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      stompClient.current?.send({
        url: `/app/signaling/${login}/${username}`,
        body: { type: 'offer', offer },
      });
    };

    const handleVideoCapture = async () => {
      await handleMediaCapture();
      connectionInterval.current = setInterval(handleOfferCreate, intervalTime);
    };

    const handleOffer = async (offer: any) => {
      await pc.setRemoteDescription(offer);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      stompClient.current?.send({
        url: `/app/signaling/${login}/${username}`,
        body: { type: 'answer', answer },
      });

      answerSent.current = true;
    };

    const handleAnswer = async (answer: any) => {
      await pc.setRemoteDescription(answer);
    };

    const handleIceCandidate = async (candidate: any) => {
      if (candidate.current) {
        await pc.addIceCandidate(new RTCIceCandidate(candidate.current));
      }
    };

    const subscribe = () => {
      stompClient.current?.subscribe<any>(
        { url: `/topic/signaling/${username}/${login}` },
        (message) => {
          setTimeout(() => clearInterval(connectionInterval.current), 1000);
          switch (message.type) {
            case 'offer':
              handleOffer(message.offer);
              break;
            case 'answer':
              handleAnswer(message.answer);
              answerReceived.current = true;
              break;
            case 'candidate':
              handleIceCandidate(message.candidate);
              break;
          }
        }
      );
    };

    const connect = () => {
      if (!stompClient.current?.connected) {
        stompClient.current?.connect(() => {
          subscribe();
          handleVideoCapture();
          handleUserConnect();
        });
      }
    };

    connect();

    return () => {
      if (connectionInterval.current) {
        clearInterval(connectionInterval.current);
      }

      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
      }

      peerConnection.current.close();
      stompClient.current?.disconnect();
      handleMediaDestroy();
      destroySounds();
    };
  }, []);

  return {
    isMicrophone,
    isCamera,
    toggleCamera,
    toggleMicrophone,
    user: login,
    friend: username,
    userVideo,
    friendVideo,
  };
};
