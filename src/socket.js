import { io } from 'socket.io-client';

const URL = `https://jankencards-server.onrender.com/`;

export const socket = io(URL, {
  autoConnect: false,
});