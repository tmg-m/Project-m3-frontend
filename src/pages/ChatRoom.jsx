import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../components/Message";
import apiService from "../services/api.service";
import '../css/chatRoom.css'
import userIcon from '../css/icons/userProfile.png'
import { AuthContext } from "../context/auth.context";


function ChatRoom() {
  const navigate = useNavigate()
  const { id } = useParams();
  const [chatData, setChatData] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [ifTask, setIfTask] = useState(true);
  const { user, isLoading } = useContext(AuthContext);

  const divStyle = { "border": "" };

  useEffect(() => {
    if(!isLoading && user){
      chatMessages.map((chat) => {
        if (chat.user === user._id) {
          divStyle.border = "2px solid purple"
          }
        divStyle.border = "2px solid green"
        }
      )
    }
  }, [chatMessages]);

  useEffect(() => {
    apiService.getChatRoom(id).then((response) => {
      if ( !("relatedTask" in response.data) ){
        setChatData(response.data)
        setIfTask(false)
      } else {
        setChatData(response.data)
      }
    })
  }, []);

  useEffect(() => {
    getChat();
  }, []);

  useEffect(() => {
    const interval = setInterval(getChat, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [chatData]);

  const getChat = () => {
    apiService.getChatRoomMessages(id).then((response) => {
      setChatMessages(response.data.chat)
    })
  }

  const handleSend = (sent) => {
    console.log(sent)
  }

  const handleLeave = () => {
    apiService.unJoinChatRoom(id).then(() => navigate(`/chatInbox`))
  }

  return (
    <>
      <div className="room-container">
        <div className="roomController">
          <h1>{chatData.title}</h1>
          <button onClick={handleLeave}>Leave chat</button>
          {ifTask ? <Link to={`/task/${chatData.relatedTask}`} >Link to this task</Link> : null}

          <div className="messages">
            {chatMessages.map((message, i) => {
              return (
                <>
                  <div className="eachChat" key={i} style={{ border: "2px solid red", margin: "5px" }}>
                    <div className="fromWho">
                      <img src={userIcon}></img>
                      <h1>{message.name}</h1>
                    </div>
                    <h2>message: {message.message_body}</h2>
                  </div>
                </>
              )
            })}
          </div>
        </div>
      </div>
      <Message chatId={id} send={handleSend} />
    </>
  )
}

export default ChatRoom;