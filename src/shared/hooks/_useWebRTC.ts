// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useCallback, useEffect, useRef } from 'react';
// import { useStateWithCallback } from './_useStateWithCallback';
// import socket, { ACTIONS } from '../socket/groupcall';
// // import freeice from 'freeice';

// const LOCAL_VIDEO = 'LOCAL_VIDEO';

// export const useWebRTC = (roomID: string) => {
//   const [clients, updateClients] = useStateWithCallback([]);

//   const peerConnections = useRef<any>({});
//   const localMediaStream = useRef<any>(null);
//   const peerMediaElements = useRef<any>({ [LOCAL_VIDEO]: null });

//   const addNewClient = useCallback(
//     (newClient: any, cb: any) => {
//       updateClients((list: any) => {
//         if (!list.includes(newClient)) {
//           return [...list, newClient];
//         }

//         return list;
//       }, cb);
//     },
//     [clients, updateClients]
//   );

//   const provideMediaRef = useCallback((id: any, node: any) => {
//     peerMediaElements.current[id] = node;
//   }, []);

//   useEffect(() => {
//     const handleNewPeer = async (data: any) => {
//       const { peerID, createOffer } = data;
//       if (peerID in peerConnections.current) {
//         return console.warn(`Peer connection already exists ${peerID}`);
//       }

//       peerConnections.current[peerID] = new RTCPeerConnection({
//         // iceServers: freeice(),
//       });

//       peerConnections.current[peerID].onicecandidate = (e: any) => {
//         if (e.candidate) {
//           socket.send(
//             JSON.stringify({
//               action: ACTIONS.RELAY_ICE,
//               peerID,
//               iceCandidate: e.candidate,
//             })
//           );
//         }
//       };

//       let trackNumber = 0;
//       peerConnections.current[peerID].ontrack = ({
//         streams: [remoteStream],
//       }: any) => {
//         trackNumber++;
//         if (trackNumber === 2) {
//           addNewClient(peerID, () => {
//             peerMediaElements.current[peerID].srcObject = remoteStream;
//           });
//         }
//       };

//       localMediaStream.current.getTracks().forEach((track: any) => {
//         peerConnections.current[peerID].addTrack(
//           track,
//           localMediaStream.current
//         );
//       });

//       if (createOffer) {
//         const offer = await peerConnections.current[peerID].createOffer();
//         await peerConnections.current[peerID].setLocalDescription(offer);
//         socket.send(
//           JSON.stringify({
//             action: ACTIONS.RELAY_SDP,
//             peerID,
//             sessionDescription: offer,
//           })
//         );
//       }
//     };

//     const setRemoteMedia = async (data: any) => {
//       const { peerID, sessionDescription: remoteDescription } = data;
//       await peerConnections.current[peerID].setRemoteDescription(
//         new RTCSessionDescription(remoteDescription)
//       );

//       if (remoteDescription.type === 'offer') {
//         const answer = await peerConnections.current[peerID].createAnswer();
//         await peerConnections.current[peerID].setLocalDescription(answer);
//         socket.send(
//           JSON.stringify({
//             action: ACTIONS.RELAY_SDP,
//             peerID,
//             sessionDescription: answer,
//           })
//         );
//       }
//     };

//     const handleRemovePeer = (data: any) => {
//       const { peerID } = data;
//       if (peerConnections.current[peerID]) {
//         peerConnections.current[peerID].close();
//       }

//       delete peerConnections.current[peerID];
//       delete peerMediaElements.current[peerID];

//       updateClients((list: any) =>
//         list.filter((client: any) => client !== peerID)
//       );
//     };

//     const handleIceCandidate = (data: any) => {
//       const { peerID, iceCandidate } = data;
//       peerConnections.current[peerID].addIceCandidate(
//         new RTCIceCandidate(iceCandidate)
//       );
//     };

//     socket.onmessage = (event: any) => {
//       const message = JSON.parse(event.data);
//       if (message.action === ACTIONS.ADD_PEER) {
//         handleNewPeer(message);
//         return;
//       }

//       if (message.action === ACTIONS.REMOVE_PEER) {
//         handleRemovePeer(message);
//         return;
//       }

//       if (message.action === ACTIONS.ICE_CANDIDATE) {
//         handleIceCandidate(message);
//         return;
//       }

//       if (message.action === ACTIONS.SESSION_DESCRIPTION) {
//         setRemoteMedia(message);
//         return;
//       }
//     };
//   }, []);

//   useEffect(() => {
//     socket.onopen = () => {
//       console.log('Socket connected');
//     };

//     const startCapture = async () => {
//       localMediaStream.current = await navigator.mediaDevices.getUserMedia({
//         audio: true,
//         video: {
//           width: 1280,
//           height: 720,
//         },
//       });

//       addNewClient(LOCAL_VIDEO, () => {
//         const localVideoElement = peerMediaElements.current[LOCAL_VIDEO];

//         if (localVideoElement) {
//           localVideoElement.volume = 0;
//           localVideoElement.srcObject = localMediaStream.current;
//         }
//       });
//     };

//     startCapture()
//       .then(() =>
//         socket.send(JSON.stringify({ action: ACTIONS.JOIN, room: roomID }))
//       )
//       .catch((e) => console.error('Ошибка: ', e));

//     return () => {
//       localMediaStream.current
//         .getTracks()
//         .forEach((track: any) => track.stop());
//       socket.send(JSON.stringify({ action: ACTIONS.LEAVE, room: roomID }));
//     };
//   }, [roomID]);

//   return { clients, provideMediaRef };
// };
