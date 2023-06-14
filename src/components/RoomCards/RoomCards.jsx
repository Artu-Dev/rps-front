import { Card } from "./../Card/Card"

import "./RoomCards.css";

export const RoomCards = () => {
  return (
    <div className="roomCards-container">
      <div>
        <Card
          isFront={false}
          />
        <Card
          isFront={false}
        />
        <Card
          isFront={false}
          />
      </div>
      <h2>Cartas na mesa</h2>
    </div>
  )
}
