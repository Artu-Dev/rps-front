import { Card } from "../Card/Card";
import "./OponentCards.css";

export const OponentCards = ({cards}) => {
  const cardElements = [];

  for(let i = 0; i < cards; i++) {
    cardElements.push(i)
  }

  return (
    <div className="oponentCard-container">
      <h1>CARTAS ADVERSÁRIAS</h1>
      <ul>
        {!cards &&
          <li className="no-cards">Sem Cartas</li>
        }
        {cardElements.map((card, index) => (
          <li className="oponentCard" key={index}>
            <Card isFront={false} />
          </li>
        ))}
      </ul>
    </div>
  )
}
