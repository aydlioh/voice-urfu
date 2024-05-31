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
  const peerConnection = useRef<any>(null);

  const answerReceived = useRef<boolean>(false);
  const answerSent = useRef<boolean>(false);
  const cond = useRef<any>(null);

  const userVideo = useRef<any>(null);
  const opponentVideo = useRef<any>(null);

  const [isOpponentReady, setOpponentReady] = useState(false);

  useEffect(() => {
    peerConnection.current = new RTCPeerConnection(configuration);
    const socket = new SockJS('https://voice-backend.ru:9002/signaling');
    stompClient.current = Stomp.over(() => socket);

    peerConnection.current.onicecandidate = (event: any) => {
      if (event.candidate) {
        cond.current = event.candidate;
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

    peerConnection.current.oniceconnectionstatechange = () => {
      if (peerConnection.current.iceConnectionState === 'connected') {
        console.log(
          'ICE candidates successfully registered, connection established'
        );
      }
    };

    peerConnection.current.ontrack = (event: any) => {
      setOpponentReady(true);
      opponentVideo.current.srcObject = event.streams[0];
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

    const handleOffer = async (offer: any) => {
      await peerConnection.current.setRemoteDescription(offer);
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      stompClient.current.send(
        `/app/signaling/${login}/${id}`,
        {},
        JSON.stringify({ type: 'answer', answer })
      );
      answerSent.current = true;
    };

    const handleAnswer = async (answer: any) => {
      await peerConnection.current.setRemoteDescription(answer);
    };

    const addMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        userVideo.current.srcObject = stream;
        stream
          .getTracks()
          .forEach((track) => peerConnection.current.addTrack(track, stream));
      } catch (error) {
        console.error('Error adding media stream:', error);
      }
    };

    const addIceCandidate = (candidate: any) => {
      peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
    };

    const goVideo = async () => {
      await addMediaStream();
      createOffer();
    };

    const connect = () => {
      if (!stompClient.current.connected) {
        stompClient.current.connect(headers, () => {
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
        });

        goVideo();
      }
    };

    connect();

    return () => {
      stompClient.current.disconnect();
    };
  }, []);

  return { user: login, opponent: id, userVideo, opponentVideo, isOpponentReady };
};
