import { Card } from "../Card/Card";
import "./MessageWinner.css";

export function MessageWinner({playResult, classe, lastPlayCards}){
  if(!playResult) return
  return (
    <div className="messageWinner-content">
      <p className={classe}>
        {playResult}
      </p>
      
      <div className="cardsResult-container">
        <span>
          <h1>Você</h1>
          <Card 
            content={lastPlayCards?.you}
          />
        </span>
        <span>
          <h1>Oponente</h1>
          <Card 
            content={lastPlayCards?.oponent}
          />
        </span>
      </div>
    </div>
  ) 
}

//se o usuario é adm, oponente
