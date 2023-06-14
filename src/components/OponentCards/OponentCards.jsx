import { Card } from "../Card/Card";
import "./OponentCards.css";

export const OponentCards = ({cards}) => {
  return (
    <div className="oponentCard-container">
      <h1>CARTAS ADVERSÁRIAS</h1>
      <ul>
        {
          cards.map((card, index) => 
            <li className="oponentCard" key={index}>
              <Card 
                isFront={false}
              />
            </li>
          )
        }
      </ul>
    </div>
  )
}
