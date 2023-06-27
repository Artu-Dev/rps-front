import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeUserDatas } from "../../redux/userSocketSlice";
import { useNavigate } from "react-router-dom";
import { TbBinary, TbCards, TbUser } from "react-icons/tb";
import { BsFillDoorOpenFill, BsFillQuestionCircleFill, BsPlusSquareFill } from "react-icons/bs";

import { socket } from "../../socket";

import "./Join.css";
import { ModalRules } from "../ModalRules/ModalRules";
import AlertMsg from "../AlertMsg/AlertMsg";

const Join = () => {
  const [username, setUsername] = useState(null);
  const [roomCode, setRoomCode] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    socket.disconnect();
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    setErrorMsg(searchParams.get("msg"));
    setTimeout(() => {
      setErrorMsg(null);
    }, 5000);
  }, [])

  function verifyUser() {
    if(!username) {
      alert("Insira um username!");
      return false
    };
    if(username.length < 3 || username.length > 10) {
      alert("Username muito grande ou muito pequeno");
      return false
    }

    return true;
  }

  function handleEnterRoom() {
    const validUsername = verifyUser();
    if(!validUsername) return false;
    if(!roomCode || roomCode.length !== 5) {
      alert("Insira um codigo de sala valido!");
      return false
    };

    handleCreateAndEnterRoom(false);
  }

  function handleCreateRoom() {
    const validUsername = verifyUser();
    if(!validUsername) return false;

    handleCreateAndEnterRoom(true);
  }

  function handleCreateAndEnterRoom(isAdmin){
    socket.connect();
    dispatch( changeUserDatas({username ,isAdmin , roomCode: roomCode}) );
    socket.emit("login", username);

    if(!roomCode) {
      socket.emit("createRoom");
    } else {
      socket.emit("enterRoom", roomCode);
    }

    navigate("/game");
  }

  return (
    <>
      {errorMsg &&
        <AlertMsg 
          time={5}
          type={"error"}
          message={errorMsg}
        />
      }
      {showTutorial &&
        <ModalRules
          accept={"Entendi"}
          onAccept={() => setShowTutorial(false)}
        />
      }
      <span className="tutorial-btn" onClick={() => setShowTutorial(true)}>
        <BsFillQuestionCircleFill/>
      </span>
      <form onSubmit={(e) => e.preventDefault()} className="login-container">
        <h1 className="login-logo">JanKenCards <i><TbCards /></i></h1>
        <div>
          <h1>Entrar ou Criar sala</h1>
          <div className="input-container">
            <label className="text">Username:</label>
            <input 
              type="text"
              placeholder="Digite um username..."
              className="input"
              onChange={(e) => setUsername(e.target.value)}
            />
            <i><TbUser/></i>
          </div>
          <div className="input-container">
            <label className="text">Codigo da sala:</label>
            <input 
              type="text"
              placeholder="Digite o codigo..."
              className="input"
              onChange={(e) => setRoomCode(e.target.value)}
            />
            <i><TbBinary/></i>
          </div>

        </div>

        <div className="login-actions">
          <button 
            onClick={handleEnterRoom}
            disabled={!roomCode}
            >Entrar <i><BsFillDoorOpenFill/></i></button>
          <button 
            onClick={handleCreateRoom}
            disabled={roomCode}
          >Criar Sala <i><BsPlusSquareFill/></i></button>
        </div>
      </form>
    </>
  )
}


export default Join
