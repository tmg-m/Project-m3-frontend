import { useState } from "react";
import apiService from "../services/api.service";
// import { AuthContext } from "../context/auth.context";
// import apiService from "../services/api.service";
import sendIcon from '../css/icons/send.png';

function Message({chatId}) {
  const [msgForm, setMsgForm] = useState({
    chatId: chatId,
    message: "",
  });

  const handleMessage = (e) => {
    setMsgForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }

  const handleMessageCreate = async () => {
    try {
      await apiService.createMessage(msgForm);
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <>
      <div className="send-container">
        <form className="sendBtn" onSubmit={handleMessageCreate}>
          <input type="text" name="message" onChange={handleMessage} />
          <div>
            <button type="submit" >
              <img className="sendBtn-icon" src={sendIcon}></img>
            </button>
          </div>
        </form>
    </div>
    </>
  )
}


export default Message;