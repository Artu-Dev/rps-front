import "./Modal.css";

export const Modal = ({message, title, accept, decline, onAccept, onDecline}) => {

  return (
    <div className="modalContainer">
      <div>
        <div className="modalText-content">
          <h1>{title}</h1>
          <p>{message}</p>
        </div>
        <span>
          <p onClick={onAccept} >{accept}</p>
          <p onClick={onDecline} >{decline}</p>
        </span>
      </div>
    </div>
  )
}
