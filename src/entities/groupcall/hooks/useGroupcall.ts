/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStatus } from '@/entities/auth';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useGroupcallSocket } from './useGroupcallSocket';
import { ACTIONS } from '@/shared/socket/groupcall';

const mediaConfig = {
  audio: true,
  video: true,
};

const rtcPeerConfig = {
  iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }],
};

export const useGroupcall = (room: string) => {
  const { socket } = useGroupcallSocket();
  const { login } = useAuthStatus();

  const participants = useRef<any>({});
  const [users, setUsers] = useState<string[]>([]);
  const mediaElements = useRef<any>({});

  const provideMediaRef = useCallback(
    (name: any, node: any) => {
      mediaElements.current[name] = node;
    },
    [mediaElements]
  );

  useEffect(() => {
    const receiveVideo = async (name: string) => {
      participants.current[name] = {};
      setUsers((prev) => [...prev, name]);

      const stream = await navigator.mediaDevices.getUserMedia(mediaConfig);

      participants.current[name].stream = stream;
      mediaElements.current[name].srcObject = stream;

      const peerConnection = new RTCPeerConnection(rtcPeerConfig);
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      participants.current[name].rtcPeer = peerConnection;

      const offerMessage = {
        id: 'receiveVideoFrom',
        sender: name,
        sdpOffer: offer,
      };

      if (socket) {
        socket.send(JSON.stringify(offerMessage));
      }

      participants.current[name].rtcPeer.onicecandidate = (e: any) => {
        const candidateMessage = {
          id: 'onIceCandidate',
          candidate: e.candidate,
          name: name,
        };

        if (socket) {
          socket.send(JSON.stringify(candidateMessage));
        }
      };

      participants.current[name].rtcPeer.ontrack = (e: any) => {
        mediaElements.current[name].srcObject = e.streams[0];
      };
    };

    const onExistingParticipants = async (message: any) => {
      receiveVideo(login);
      message.data.forEach(receiveVideo);
    };

    const onNewParticipant = (message: any) => {
      receiveVideo(message.name);
    };

    const onParticipantLeft = (message: any) => {
      if (participants.current[message.name]) {
        if (participants.current[message.name].stream) {
          participants.current[message.name].stream
            .getTracks()
            .forEach((track: any) => track.stop());
        }

        delete participants.current[message.name];
      }
    };

    const receiveVideoResponse = async (message: any) => {
      const sdp = new RTCSessionDescription(message.sdpAnswer);
      participants.current[message.name].rtcPeer.setRemoteDescription(sdp);
      const answer = await participants.current[
        message.name
      ].rtcPeer.createAnswer();
      participants.current[message.name].rtcPeer.setLocalDescription(answer);
    };

    const iceCandidate = (message: any) => {
      const candidate = new RTCIceCandidate(message.candidate);
      participants.current[message.name].rtcPeer.addIceCandidate(candidate);
    };

    if (socket) {
      const message = {
        id: ACTIONS.JOIN,
        name: login,
        room: room,
      };
      socket.send(JSON.stringify(message));
      socket.onmessage = (e) => {
        const message = JSON.parse(e.data);
        console.log('Received message: ', message);

        switch (message.id) {
          case 'existingParticipants':
            onExistingParticipants(message);
            break;
          case 'newParticipantArrived':
            onNewParticipant(message);
            break;
          case 'participantLeft':
            onParticipantLeft(message);
            break;
          case 'receiveVideoAnswer':
            receiveVideoResponse(message);
            break;
          case 'iceCandidate':
            iceCandidate(message);
            break;
          default:
            console.error('Unrecognized message', message);
        }
      };
    }

    return () => {
      onParticipantLeft({ name: login });

      if (socket) {
        socket.send(
          JSON.stringify({
            id: ACTIONS.LEAVE,
          })
        );
      }
    };
  }, []);

  return { users, provideMediaRef };
};
