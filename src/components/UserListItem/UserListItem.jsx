import { socket } from "../../socket";
import "./UserListItem.css";

export const UserListItem = ({ user, alreadyPlayed, roomPoints, cardSelected}) => {
	const userClass = user.id === socket.id ? "you" : "";
	const oponentPlayed = alreadyPlayed ? "AlreadyPlayed" : "";
	const cardSelectedClass = cardSelected ? "AlreadyPlayed" : "";
	
	const userPoints = user.isAdmin ? (roomPoints?.user || 0) : (roomPoints?.oponent || 0);

  return (
    <li className="playerItem">
      <p
        className={`username ${userClass} ${user.id !== socket.id ? oponentPlayed : cardSelectedClass}`}
      >
        {user.username}
        {user.id === socket.id ? " (Você)" : ""}
      </p>
			{user.isAdmin && <p>{userPoints} Pontos</p>}
      {!user.isAdmin && <p>{userPoints} Pontos</p>}
    </li>
  );
};
