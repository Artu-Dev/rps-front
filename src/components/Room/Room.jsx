import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import copy from "clipboard-copy";
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import "./Room.css";

import { UserCards } from '../UserCards.jsx/UserCards';
import { OponentCards } from '../OponentCards/OponentCards';
import { MessageWinner } from '../MessageWinner/MessageWinner';
import AlertMsg from '../AlertMsg/AlertMsg';
import { UserListItem } from '../UserListItem/UserListItem';
import { ModalRules } from '../ModalRules/ModalRules';

export default function Room({usersOnline, cards, roomPointsInfo, oponentCards, alreadyPlayed, lastPlayCards}) {
  const [playResult, setPlayResult] = useState(null);
  const [message, setMessage] = useState(null);
  const [cardSelected, setCardSelected] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const userRedux = useSelector(state => state.user);
  const roomPoints = roomPointsInfo.points;

  useEffect(() => {
    if (roomPointsInfo.winner === "empate") {
      setPlayResult("Empate!! \uD83D\uDC4D");
    } else if (roomPointsInfo.winner === "you") {
      setPlayResult("Ganhou!! \uD83C\uDF89");
    } else if (roomPointsInfo.winner === "oponente") {
      setPlayResult("Perdeu!! \uD83D\uDE1E");
    } else if (!roomPointsInfo.winner) {
      setPlayResult(null);
    }
    
    setTimeout(() => {
      setPlayResult(null)
    }, 3000);
  }, [roomPointsInfo])

  useEffect(() => {
    if(!alreadyPlayed){
      setCardSelected(false)
    }
  }, [alreadyPlayed])

  function handleClikCode() {
    if(message) return false;
    copy(userRedux.roomCode);
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
        />
      }
      {showTutorial &&
        <ModalRules
          accept={"Entendi"}
          onAccept={() => setShowTutorial(false)}
        />
      }
      <span className="tutorial-btn" onClick={() => setShowTutorial(true)}>
        <BsFillQuestionCircleFill/>
      </span>

      <div className="players-list">
        <h2>Jogadores:</h2>

        <ul>
          {usersOnline.map((user, index) => (
            <UserListItem 
              key={index}
              user={user}
              cardSelected={cardSelected}
              alreadyPlayed={alreadyPlayed}
              roomPoints={roomPoints}
            />
          ))}
        </ul>
        <div className="room-code" onClick={handleClikCode}>
          Codigo da sala:
          <span>{userRedux.roomCode}</span>
        </div>
      </div>

      <section className="gameContainer">
        <OponentCards cards={oponentCards} />
        {roomPointsInfo.winner && ( 
          <MessageWinner
            playResult={playResult}
            classe={roomPointsInfo.winner} 
            lastPlayCards={lastPlayCards}
          />
        )}
        <UserCards 
          setCardSelected={setCardSelected}
          cards={cards}
        /> 
      </section>
    </div>
  );
}
