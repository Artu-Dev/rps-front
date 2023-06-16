import "./MessageWinner.css";

export function MessageWinner({playResult, classe}){
  if(!playResult) return

  console.log(classe);

  return (
    <div className="messageWinner-content">
      <p className={classe}>
        {playResult}
      </p> 
    </div>
  ) 
}
 
