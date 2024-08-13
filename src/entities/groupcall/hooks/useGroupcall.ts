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
    (name: string, node: HTMLVideoElement | null) => {
      mediaElements.current[name] = node;
      if (
        participants.current[name] &&
        participants.current[name].stream &&
        node
      ) {
        node.srcObject = participants.current[name].stream;
      }
    },
    []
  );

  useEffect(() => {
    const receiveVideo = async (name: string) => {
      participants.current[name] = {};
      setUsers((prev) => [...prev, name]);
    };

    const onExistingParticipants = async (message: any) => {
      participants.current[login] = {};
      setUsers((prev) => [...prev, login]);

      const stream = await navigator.mediaDevices.getUserMedia(mediaConfig);

      participants.current[login].stream = stream;

      const peerConnection = new RTCPeerConnection(rtcPeerConfig);
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });

      participants.current[login].rtcPeer = peerConnection;

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      const offerMessage = {
        id: 'receiveVideoFrom',
        sender: login,
        sdpOffer: offer.sdp,
      };

      socket?.send(JSON.stringify(offerMessage));

      peerConnection.onicecandidate = (e: any) => {
        if (e.candidate) {
          const candidateMessage = {
            id: 'onIceCandidate',
            candidate: e.candidate,
            name: login,
          };
          socket?.send(JSON.stringify(candidateMessage));
        }
      };

      peerConnection.ontrack = (e: RTCTrackEvent) => {
        const remoteStream = e.streams[0];
        if (mediaElements.current[login]) {
          mediaElements.current[login].srcObject = remoteStream;
        }
      };

      message.data.forEach(receiveVideo);
    };

    const onNewParticipant = async ({ name }: any) => {
      await receiveVideo(name);
      const peerConnection = new RTCPeerConnection(rtcPeerConfig);

      participants.current[name].rtcPeer = peerConnection;

      peerConnection.onicecandidate = (e: any) => {
        if (e.candidate) {
          const candidateMessage = {
            id: 'onIceCandidate',
            candidate: e.candidate,
            name,
          };
          socket?.send(JSON.stringify(candidateMessage));
        }
      };

      peerConnection.ontrack = (e: RTCTrackEvent) => {
        console.log('ontrack event for new participant:', e);
        const [remoteStream] = e.streams;
        if (mediaElements.current[name]) {
          mediaElements.current[name].srcObject = remoteStream;
        }
      };

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      const offerMessage = {
        id: 'receiveVideoFrom',
        sender: login,
        sdpOffer: offer.sdp,
      };

      socket?.send(JSON.stringify(offerMessage));
    };

    const onParticipantLeft = ({ name }: any) => {
      if (participants.current[name]) {
        if (participants.current[name].stream) {
          participants.current[name].stream
            .getTracks()
            .forEach((track: any) => track.stop());
        }
        delete participants.current[name];
        setUsers((prev) => prev.filter((user) => user !== name));
      }
    };

    const receiveVideoResponse = async ({ name, sdpAnswer }: any) => {
      const peerConnection = participants.current[name].rtcPeer;
      const sdp = new RTCSessionDescription({
        type: 'answer',
        sdp: sdpAnswer,
      });
      await peerConnection.setRemoteDescription(sdp);
    };

    const iceCandidate = ({ candidate, name }: any) => {
      const iceCandidate = new RTCIceCandidate(candidate);
      const peerConnection = participants.current[name].rtcPeer;
      if (peerConnection) {
        peerConnection.addIceCandidate(iceCandidate);
      }
    };

    if (socket) {
      const message = {
        id: ACTIONS.JOIN,
        name: login,
        room,
      };
      socket.send(JSON.stringify(message));
      socket.onmessage = (e) => {
        const message = JSON.parse(e.data);
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
  }, [login, room, socket]);

  return { users, provideMediaRef };
};
