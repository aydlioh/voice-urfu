/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStatus } from '@/entities/auth';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Stomp from 'stompjs';
// import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';
import { TokenService } from '@/shared/api/services';

const headers = {
  Authorization: `Bearer ${TokenService.get()?.jwtToken}`,
};

const intervalTime = 1000;

const configuration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

export const useVideocall = () => {
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
      clearInterval(connectionInterval.current);
      opponentVideo.current.srcObject = e.streams[0];
    };

    peerConnection.current = pc;
  }, []);

  useEffect(() => {
    const socket = new SockJS('https://voice-backend.ru:9000/signaling');
    stompClient.current = Stomp.over(socket);
    const pc = peerConnection.current;

    const goVideo = async () => {
      async function addMediaStream() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          userVideo.current.srcObject = stream;
          videoStream.current = stream;
          stream.getTracks().forEach((track) => pc.addTrack(track, stream));
        } catch (error) {
          console.error('Error adding media stream:', error);
        }
      }

      async function createOffer() {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        stompClient.current.send(
          `/app/signaling/${login}/${id}`,
          {},
          JSON.stringify({ type: 'offer', offer })
        );
      }

      await addMediaStream();
      connectionInterval.current = setInterval(createOffer, intervalTime);
    };

    const subscribe = () => {
      async function handleOffer(offer: any) {
        await pc.setRemoteDescription(offer);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        stompClient.current.send(
          `/app/signaling/${login}/${id}`,
          {},
          JSON.stringify({ type: 'answer', answer })
        );
        answerSent.current = true;
      }

      async function handleAnswer(answer: any) {
        await pc.setRemoteDescription(answer);
      }

      async function addIceCandidate(candidate: any) {
        if (candidate.current) {
          await pc.addIceCandidate(new RTCIceCandidate(candidate.current));
        }
      }

      stompClient.current.subscribe(
        `/topic/signaling/${id}/${login}`,
        (output: any) => {
          const message = JSON.parse(output.body);
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
        stompClient.current.connect(headers, (frame: any) => {
          console.log('Connected: ' + frame);
          subscribe();
          goVideo();
        });
      }
    };

    const destroyMediaStream = () => {
      videoStream.current.getTracks().forEach((track: any) => track.stop());
    };

    connect();

    return () => {
      stompClient.current.disconnect();
      if (videoStream.current) {
        destroyMediaStream();
      }
    };
  }, []);

  return {
    user: login,
    opponent: id,
    userVideo,
    opponentVideo,
  };
};
