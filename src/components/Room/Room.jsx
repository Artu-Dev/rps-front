import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import copy from "clipboard-copy";

import "./Room.css";

import { socket } from '../../socket'; 
import { UserCards } from '../UserCards.jsx/UserCards';
import { OponentCards } from '../OponentCards/OponentCards';
import { MessageWinner } from '../MessageWinner/MessageWinner';
import AlertMsg from '../AlertMsg/AlertMsg';

export default function Room({roomCode, usersOnline, cards, roomPointsInfo, oponentCards}) {
  const [playResult, setPlayResult] = useState(null);
  const [message, setMessage] = useState(null);
  const [msgType, setMsgType] = useState("ok");
  
  const userRedux = useSelector(state => state.user);
  const roomPoints = roomPointsInfo.points;
  
  useEffect(() => {
    if (roomPointsInfo.winner === "empate") {
      setPlayResult("Empate!!");
    } else if (roomPointsInfo.winner === "usuario" && userRedux.isAdmin) {
      setPlayResult("Ganhou!!");
    } else if(roomPointsInfo.winner === "oponente" && !userRedux.isAdmin) {
      setPlayResult("Ganhou!!")
    } else if(!roomPointsInfo.winner){
      setPlayResult(null);
    } else {
      roomPointsInfo.winner
      setPlayResult("Perdeu!!");
    }
    setTimeout(() => {
      setPlayResult(null)
    }, 3000);
  }, [roomPointsInfo])

  console.log(playResult);

  function handleClikCode() {
    if(message) return false;
    copy(roomCode || userRedux.roomCode);
    setMessage("💃 Código da sala copiado com sucesso! 🎉");
    setTimeout(() => {
      setMessage(null);
    }, 3500);
  }

  return (
    <div className="roomContainer">
      {message &&
        <AlertMsg 
          message={message}
          type={msgType}
        />
      }

      <div className="players-list">
        <h2>Jogadores:</h2>

        <ul>
          {usersOnline.map((user, index) => (
            <li key={index}>
              <p className={`username ${user.id === socket.id ? "you" : ""}`}>
                {user.username}
                {user.id === socket.id ? " (Você)" : ""}
              </p>
              {user.isAdmin && <p>{roomPoints ? roomPoints.user : 0} Pontos</p>}
              {!user.isAdmin && <p>{roomPoints ? roomPoints.oponent : 0} Pontos</p>}
            </li>
          ))}
        </ul>
        <div className="room-code" onClick={handleClikCode}>
          Codigo da sala:
          <span>{roomCode || userRedux.roomCode}</span>
        </div>
      </div>

      <section className="gameContainer">
        <OponentCards cards={oponentCards} />
        {roomPointsInfo.winner && ( 
          <MessageWinner 
            playResult={playResult}
            classe={roomPointsInfo.winner} 
          />
        )}
        <UserCards 
          cards={cards}
        /> 
      </section>


      <MessageWinner  
        playResult={playResult}
      />
    </div>
  );
}
