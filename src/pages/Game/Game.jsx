import { useEffect, useState } from "react";
import Room from "../../components/Room/Room";
import Loading from "../../components/Loading/Loading";
import { socket } from "../../socket";
import { useNavigate } from "react-router-dom";
import { changeRoomCode } from "../../redux/userSocketSlice";
import { useDispatch, useSelector } from "react-redux";
import { ConnectionState } from "../../socketio/ConnectionState";

export const Game = () => {
	const [isConnected, setIsConnected] = useState(socket.connected);
  const [cards, setCards] = useState([]);
  const [oponentCards, setOponentCards] = useState(0);
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);
  const [lastPlayCards, setLastPlayCards] = useState([]);
  const [disconnectMsg, setDisconnectMsg] = useState("");
  
  const [usersOnline, setUsersOnline] = useState([]);
  const [roomCode, setRoomCode] = useState(null);
  const [roomPointsInfo, setRoomPointsInfo] = useState({ points: { user: 0, oponent: 0 } });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRedux = useSelector(state => state.user);

  useEffect(() => {
    function onRoomCreated(code) {
      dispatch(changeRoomCode(code));
      setRoomCode(code);
    } 
    function onDisconnectError(msg) {
      navigate(`/?msg=${encodeURIComponent(msg)}`);
    }

    socket.on("connect",() => setIsConnected(true));
    socket.on("disconnect",() => setIsConnected(false));
    socket.on("disconnect_error",(message) => onDisconnectError(message));
    socket.on("disconnect_room",() => socket.disconnect()); 

    socket.on("roomCreated", code => onRoomCreated(code));
    socket.on("changeCards", cards => setCards(cards));
    socket.on("oponentCards", cards => setOponentCards(cards));
    socket.on("cardsMatch", cards => setLastPlayCards(cards));
    socket.on("alreadyPlayed", boolean => setAlreadyPlayed(boolean));
    socket.on("usersOnline", users => setUsersOnline(users));
    socket.on("result_game", result => setRoomPointsInfo(result));    

    return () => {
      socket.off("connect",() => setIsConnected(true));
      socket.off("disconnect",() => setIsConnected(false));
      
      socket.off("disconnect_room",() => socket.disconnect());
      
      socket.off("result_game", result => setRoomPointsInfo(result));
      socket.off("roomCreated", code => onRoomCreated(code));
      socket.off("changeCards", cards => setCards(cards));
      socket.off("cardsMatch", cards => setLastPlayCards(cards));
      socket.off("oponentCards", cards => setOponentCards(cards));
      socket.off("alreadyPlayed", boolean => setAlreadyPlayed(boolean));
      socket.off("usersOnline", users => setUsersOnline(users));
    } 
  }, []);

  useEffect(() => {
    if(!userRedux.username) {
      navigate("/");
    }
  }, [userRedux]);

  if(!isConnected || !usersOnline) return <Loading />
  return (
    <>
      <Room
        usersOnline={usersOnline}
        cards={cards}
        alreadyPlayed={alreadyPlayed}
        roomPointsInfo={roomPointsInfo}
        oponentCards={oponentCards}
        lastPlayCards={lastPlayCards}
      />
      {/* <ConnectionState isConnected={isConnected} /> */}
    </>
  )
}
