import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import {VscDebugStart, VscDebugRestart} from "react-icons/vsc";

import { socket } from '../../socket'; 

import "./Room.css";
import { UserCards } from '../UserCards.jsx/UserCards';
import { OponentCards } from '../OponentCards/OponentCards';
import { RoomCards } from '../RoomCards/RoomCards';
import { Modal } from '../Modal/Modal';

export default function Room({roomCode, usersOnline, cards, roomPointsInfo}) {
  const [loading, setLoading] = useState(false);
  const [modalDecision, setModalDecision] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [playResult, setPlayResult] = useState();

  const userRedux = useSelector(state => state.user);
  
  const roomPoints = roomPointsInfo.points;

  
  useEffect(() => {
    if (roomPointsInfo.winner === "empate") {
      setPlayResult("Empate!!");
    } else if (roomPointsInfo.winner === "usuario" && userRedux.isAdmin) {
      setPlayResult("Ganhou!!");
    } else if(roomPointsInfo.winner === "oponente" && !userRedux.isAdmin) {
      setPlayResult("Ganhou!!")
    } else {
      setPlayResult("Perdeu!!");
    }
    

  }, [roomPointsInfo])

  function handleClick(emit, timeout = 1000) {
    setLoading(true);
    setShowModal(false)
    socket.timeout(timeout).emit(emit, () => setLoading(false));
  }


  return (
    <div>
      {showModal && (
        <Modal
          onAccept={() => handleClick("reset")}
          onDecline={() => setShowModal(false)}
          title="Tem certeza que deseja resetar a sala? 🔄"
          message="Essa ação irá apagar toda a pontuação da sala! 😱"
          accept="Claro, bora recomeçar! 👍"
          decline="Oops, melhor não! 😅"
        />
      )}

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
      </div>

      <OponentCards cards={cards} />
      <RoomCards />
      {roomPointsInfo.winner && (
        <p className="winnerContainer">
          <span>
            {playResult}
          </span>
        </p>
      )}
      <UserCards cards={cards} />


      {userRedux.isAdmin && (
        <div className="admin-actions">
          <button onClick={() => handleClick("start")} disabled={loading}>
            Start{" "}
            <i>
              <VscDebugStart />
            </i>
          </button>
          <button onClick={() => handleClick("finish_game")} disabled={loading}>
            Result
          </button>
          <button onClick={() => setShowModal(true)} disabled={loading}>
            reset{" "}
            <i>
              <VscDebugRestart />
            </i>
          </button>
        </div>
      )}
      <div className="room-code">
        Codigo da sala:
        <span>{roomCode || userRedux.roomCode}</span>
      </div>
    </div>
  );
}
