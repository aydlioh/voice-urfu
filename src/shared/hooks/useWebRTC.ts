/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef } from 'react';
import { useStateWithCallback } from './useStateWithCallback';
import socket, { ACTIONS } from '../socket';
// import freeice from 'freeice';

const LOCAL_VIDEO = 'LOCAL_VIDEO';

export const useWebRTC = (roomID: string) => {
  const [clients, updateClients] = useStateWithCallback([]);

  const peerConnections = useRef<any>({});
  const localMediaStream = useRef<any>(null);
  const peerMediaElements = useRef<any>({ [LOCAL_VIDEO]: null });

  const addNewClient = useCallback((newClient: any, cb: any) => {
    updateClients((list: any) => {
      if (!list.includes(newClient)) {
        return [...list, newClient];
      }
      return list;
    }, cb);
  }, []);

  const provideMediaRef = useCallback((id: any, node: any) => {
    peerMediaElements.current[id] = node;
  }, []);

  useEffect(() => {
    socket.onopen = () => {
      socket.send(JSON.stringify({ action: ACTIONS.JOIN, room: roomID }));
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const { action, data } = message;

      switch (action) {
        case ACTIONS.ADD_PEER:
          handleNewPeer(data);
          break;
        case ACTIONS.SESSION_DESCRIPTION:
          setRemoteMedia(data);
          break;
        case ACTIONS.REMOVE_PEER:
          handleRemovePeer(data);
          break;
        case ACTIONS.ICE_CANDIDATE:
          handleIceCandidate(data);
          break;
        default:
          break;
      }
    };

    return () => {
      socket.close();
    };
  }, [roomID]);

  const handleNewPeer = async ({ peerID, createOffer }: any) => {
    if (peerID in peerConnections.current) {
      return console.warn(`Peer connection already exists ${peerID}`);
    }

    peerConnections.current[peerID] = new RTCPeerConnection({
      // iceServers: freeice(),
    });

    peerConnections.current[peerID].onicecandidate = (e: any) => {
      if (e.candidate) {
        socket.send(
          JSON.stringify({
            action: ACTIONS.RELAY_ICE,
            peerID,
            iceCandidate: e.candidate,
          })
        );
      }
    };

    let trackNumber = 0;
    peerConnections.current[peerID].ontrack = ({
      streams: [remoteStream],
    }: any) => {
      trackNumber++;
      if (trackNumber === 2) {
        // Когда загрузит и video и audio
        addNewClient(peerID, () => {
          peerMediaElements.current[peerID].srcObject = remoteStream;
        });
      }
    };

    localMediaStream.current.getTracks().forEach((track: any) => {
      peerConnections.current[peerID].addTrack(track, localMediaStream.current);
    });

    if (createOffer) {
      const offer = await peerConnections.current[peerID].createOffer();
      await peerConnections.current[peerID].setLocalDescription(offer);
      socket.send(
        JSON.stringify({
          action: ACTIONS.RELAY_SDP,
          peerID,
          sessionDescription: offer,
        })
      );
    }
  };

  const setRemoteMedia = async ({
    peerID,
    sessionDescription: remoteDescription,
  }: any) => {
    await peerConnections.current[peerID].setRemoteDescription(
      new RTCSessionDescription(remoteDescription)
    );

    if (remoteDescription.type === 'offer') {
      const answer = await peerConnections.current[peerID].createAnswer();
      await peerConnections.current[peerID].setLocalDescription(answer);
      socket.send(
        JSON.stringify({
          action: ACTIONS.RELAY_SDP,
          peerID,
          sessionDescription: answer,
        })
      );
    }
  };

  const handleRemovePeer = ({ peerID }: any) => {
    if (peerConnections.current[peerID]) {
      peerConnections.current[peerID].close();
    }

    delete peerConnections.current[peerID];
    delete peerMediaElements.current[peerID];

    updateClients((list: any) =>
      list.filter((client: any) => client !== peerID)
    );
  };

  const handleIceCandidate = ({ peerID, iceCandidate }: any) => {
    peerConnections.current[peerID].addIceCandidate(
      new RTCIceCandidate(iceCandidate)
    );
  };

  useEffect(() => {
    const startCapture = async () => {
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: 1280,
          height: 720,
        },
      });

      addNewClient(LOCAL_VIDEO, () => {
        const localVideoElement = peerMediaElements.current[LOCAL_VIDEO];

        if (localVideoElement) {
          localVideoElement.volume = 0;
          localVideoElement.srcObject = localMediaStream.current;
        }
      });
    };

    startCapture()
      .then(() =>
        socket.send(
          JSON.stringify({
            action: ACTIONS.JOIN,
            room: roomID,
          })
        )
      )
      .catch((e) => console.error('Ошибка: ', e));

    return () => {
      localMediaStream.current
        .getTracks()
        .forEach((track: any) => track.stop());
      socket.send(
        JSON.stringify({
          action: ACTIONS.LEAVE,
          room: roomID,
        })
      );
    };
  }, [roomID]);

  return { clients, provideMediaRef };
};
