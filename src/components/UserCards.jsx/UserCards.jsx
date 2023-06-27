import { socket } from "../../socket";
import AdminActions from "../AdminActions/AdminActions";
import { Card } from "../Card/Card";
import "./UserCards.css";

export const UserCards = ({cards, setCardSelected}) => {
  function hanleCardClick(index,) {
    setCardSelected(true);
    socket.emit("selectCard", index);
  }
  return (
    <div className="cards-container">
      <h1>Suas Cartas</h1>
      <ul>
        {!cards || cards.length === 0 &&
          <li className="no-cards">Sem Cartas</li>
        }
        {cards.map((card, index) => (
          <li
            onClick={() => hanleCardClick(index)}
            className={`card-${card}`} 
            key={index}
          >
            <Card
              content={card}
            />
          </li>
        ))}
      </ul>

      <AdminActions />
    </div>
  );
}
