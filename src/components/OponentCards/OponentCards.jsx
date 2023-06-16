import { Card } from "../Card/Card";
import "./OponentCards.css";

export const OponentCards = ({cards}) => {
  const cardElements = [];

  for(let i = 0; i < cards; i++) {
    cardElements.push(i)
  }

  console.log(cards); 

  return (
    <div className="oponentCard-container">
      <h1>CARTAS ADVERSÁRIAS</h1>
      <ul>
        {cardElements.map((card, index) => (
          <li className="oponentCard" key={index}>
            <Card isFront={false} />
          </li>
        ))}
      </ul>
    </div>
  )
}
