import './App.css';

import { useEffect, useState } from 'react';

import Join from './components/Join/Join';
import Room from './components/Room/Room';

import { socket } from "./socket";
import { ConnectionState } from "./socketio/ConnectionState";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [cards, setCards] = useState([]);
  const [oponentCards, setOponentCards] = useState(0);
  
  const [usersOnline, setUsersOnline] = useState([]);
  const [roomCode, setRoomCode] = useState(null);
  const [roomPointsInfo, setRoomPointsInfo] = useState({ points: { user: 0, oponent: 0 } });

  useEffect(() => {
    socket.on("connect",() => setIsConnected(true));
    socket.on("disconnect",() => setIsConnected(false));
    socket.on("disconnect_room",() => socket.disconnect());

    socket.on("roomCreated", code => setRoomCode(code));
    socket.on("changeCards", cards => setCards(cards));
    socket.on("oponentCards", cards => setOponentCards(cards));
    socket.on("usersOnline", users => setUsersOnline(users));

    socket.on("result_game", result => setRoomPointsInfo(result));

    socket.on("connectionError", err => console.log(err));
    
    return () => {
      socket.off("connect",() => setIsConnected(true));
      socket.off("disconnect",() => setIsConnected(false));
      
      socket.off("disconnect_room",() => socket.disconnect());
      
      socket.off("result_game", result => setRoomPointsInfo(result));
      socket.off("roomCreated", code => onRoomCreated(code));
      socket.off("changeCards", cards => onChangeCards(cards));
      socket.off("oponentCards", cards => setOponentCards(cards));
      socket.off("usersOnline", users => setUsersOnline(users));
    } 
  }, []);

  console.log(oponentCards);

  return (
    <>
      {!usersOnline.length &&
        <Join

      />
      }
      <Room 
        usersOnline={usersOnline}
        roomCode={roomCode}
        cards={cards}
        roomPointsInfo={roomPointsInfo}
        oponentCards={oponentCards}
      />
      {/* <ConnectionState isConnected={isConnected} /> */}

      
    </>
  )
}

export default App
