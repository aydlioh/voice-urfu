export * from './actions';

import { io } from 'socket.io-client';

const options = {
  'force new connection': true,
  reconnectionAttempts: Infinity,
  timeout: 10000,
  transports: ['websocket'],
};

const socket = io('ws://localhost:3001', options);
// const socket = io('ws://45.141.76.83:8082/signaling/socket', options);

export default socket;
