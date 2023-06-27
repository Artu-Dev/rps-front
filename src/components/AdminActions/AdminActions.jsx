import { VscDebugRestart, VscDebugStart } from "react-icons/vsc";
import { socket } from "../../socket";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Modal } from "../Modal/Modal";

import "./AdminActions.css";

const AdminActions = () => {
   const [loading, setLoading] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const userRedux = useSelector(state => state.user);

   function handleClick(emit, timeout = 1000) {
      setLoading(true);
      setShowModal(false)
      socket.timeout(timeout).emit(emit, () => setLoading(false));
   }

   if(!userRedux.isAdmin) return false;
   return (
      <div>
         {showModal && (
            <Modal
               onAccept={() => handleClick("reset")}
               onDecline={() => setShowModal(false)}
               title="Tem certeza que deseja resetar a sala? 🔄"
               message="Essa ação irá apagar toda a pontuação da sala! 😱"
               accept="Claro, bora recomeçar! 👍"
               decline="Oops, melhor não! 😅"
            />
         )}
         <div className="admin-actions">
            <button onClick={() => handleClick("start")} disabled={loading}>
               Start{" "}
               <i>
                  <VscDebugStart />
               </i>
            </button>
            <button
               className="result-btn"
               onClick={() => handleClick("finish_game")}
               disabled={loading}
            >
               Result
            </button>
            <button onClick={() => setShowModal(true)} disabled={loading}>
               reset{" "}
               <i>
                  <VscDebugRestart />
               </i>
            </button>
         </div>
      </div>
   );
}

export default AdminActions