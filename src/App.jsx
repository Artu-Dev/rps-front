import './App.css';

import { useEffect, useState } from 'react';

import Join from './components/Join/Join';

import { socket } from "./socket";
import { ConnectionState } from "./socketio/ConnectionState";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on("connect",() => setIsConnected(true));
    socket.on("disconnect",() => setIsConnected(false));
    socket.on("disconnect_room",() => socket.disconnect());

    return () => {
      socket.off("connect",() => setIsConnected(true));
      socket.off("disconnect",() => setIsConnected(false));
      socket.off("disconnect_room",() => socket.disconnect());
    } 
  }, []);

  return (
    <>
      <Join />

      {/* <ConnectionState isConnected={isConnected} /> */}
    </>
  )
}

export default App
