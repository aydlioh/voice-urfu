/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStatus } from '@/entities/auth';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';

const headers = {
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJTaHVrc2hpbm1ha3NpbS5ydUBtYWlsLnJ1IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IlNodWtzaGlubWFrc2ltLnJ1QG1haWwucnUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTcxNjIzMTM3MCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI2NiIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcyNjYifQ.gl6KyviYyB8hNAQ5fjZ_vGjlR8w4koJjfqHumoSw5m8',
};

const configuration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

export const useVideocall = () => {
  const { id } = useParams();
  const { login } = useAuthStatus();

  const stompClient = useRef<any>(null);

  const answerReceived = useRef<boolean>(false);
  const answerSent = useRef<boolean>(false);
  const cond = useRef<any>(null);

  const userVideo = useRef<any>(null);
  const opponentVideo = useRef<any>(null);

  const [isOpponentReady, setOpponentReady] = useState(false);

  useEffect(() => {
    const socket = new SockJS('https://voice-backend.ru:9000/signaling');
    stompClient.current = Stomp.over(() => socket);

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

    pc.oniceconnectionstatechange = () => {
      console.log('ICE connection state change:', pc.iceConnectionState);
      if (pc.iceConnectionState === 'connected') {
        console.log(
          'ICE candidates successfully registered, connection established'
        );
      }
    };

    pc.ontrack = (e: any) => {
      setOpponentReady(true);
      opponentVideo.current.srcObject = e.streams[0];
    };

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

    async function createOffer() {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      stompClient.current.send(
        `/app/signaling/${login}/${id}`,
        {},
        JSON.stringify({ type: 'offer', offer })
      );
    }

    async function handleAnswer(answer: any) {
      await pc.setRemoteDescription(answer);
    }

    async function addMediaStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        userVideo.current.srcObject = stream;
        stream.getTracks().forEach((track) => pc.addTrack(track, stream));
      } catch (error) {
        console.error('Error adding media stream:', error);
      }
    }

    async function goVideo() {
      await addMediaStream();
      createOffer();
    }

    function addIceCandidate(candidate: any) {
      pc.addIceCandidate(new RTCIceCandidate(candidate));
    }

    const subscribe = () => {
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
        stompClient.current.connect(headers, () => {
          subscribe();
          goVideo();
        });
      }
    };

    connect();
  }, []);

  return {
    user: login,
    opponent: id,
    userVideo,
    opponentVideo,
    isOpponentReady,
  };
};
