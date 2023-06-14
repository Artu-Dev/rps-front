import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeUserDatas } from "../../redux/userSocketSlice";

import { socket } from "../../socket";

const Join = () => {
  const [username, setUsername] = useState(null);
  const [roomCode, setRoomCode] = useState(null);
  const dispatch = useDispatch();

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
    dispatch( changeUserDatas({username ,isAdmin: false, roomCode}) );
    socket.emit("login", username);
    socket.emit("enterRoom", roomCode);
  }

  function handleCreateRoom() {
    const validUsername = verifyUser();
    if(!validUsername) return false;
    dispatch( changeUserDatas({username ,isAdmin: true, roomCode: false}) );
    socket.emit("login", username);
    socket.emit("createRoom");
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <legend>
          <h1>Username</h1>
        </legend>

        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
      </fieldset>
      <fieldset>
        <legend>
          <h2>Entrar com Codigo</h2>
        </legend>

        <input type="text" placeholder="Codigo de Sala" onChange={(e) => setRoomCode(e.target.value)}/>
        <button onClick={handleEnterRoom} >Entrar</button>
      </fieldset>
      <fieldset>
        <legend>
          <h2>Criar Sala</h2>
        </legend>

        <button onClick={handleCreateRoom}>Criar</button>
      </fieldset>
    </form>
  )
}


export default Join
