/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { FaRegHandPaper, FaRegHandRock, FaRegHandScissors } from "react-icons/fa";
import "./card.css";
import { forwardRef } from "react";

export const Card = forwardRef( ({isFront = true, content = ""}, ref) => {
  return (
    <div ref={ref} className={`card-content ${isFront ? "front" : "back"}`}>
      {content === "pedra" && <i>{<FaRegHandRock />}</i>}
      {content === "papel" && <i>{<FaRegHandPaper />}</i>}
      {content === "tesoura" && <i>{<FaRegHandScissors />}</i>}
      {!isFront && <p>RPS</p>}
    </div>
  );
});
