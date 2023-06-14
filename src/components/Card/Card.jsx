import { FaRegHandPaper, FaRegHandRock, FaRegHandScissors } from "react-icons/fa";
import "./card.css";

export const Card = ({isFront = true, content}) => {
  return (
    <div className={`card-content ${isFront ? "front" : "back"}`}>
      {content === "pedra" && <i>{<FaRegHandRock />}</i>}
      {content === "papel" && <i>{<FaRegHandPaper />}</i>}
      {content === "tesoura" && <i>{<FaRegHandScissors />}</i>}
      {isFront === false && <p>RPS</p>}
    </div>
  );
}
