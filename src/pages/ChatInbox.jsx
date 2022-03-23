import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import apiService from "../services/api.service";
import '../css/community.css'
import inboxIcon from '../css/icons/inbox.png'
import UserIcon from "../components/userIcon";

function ChatInbox() {
  const { isLoading, user } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    apiService.getAllChat().then(response => {
      setData(response.data);
    });
  }, []);

  return (
    <>
      <div className="community-page">
        <UserIcon />
        <div className="community-controler">
          <h1>Inbox</h1>
          <div>
            {data.map((room, i) => {
              if (!isLoading && user) {
                if (!('relatedTask' in room)) {
                  if (room.users.includes(user._id)) {
                    return (
                      <>
                        <div key={i} className="room-title" >
                          <Link className="chat-controller" to={`/chat/${room._id}`}>
                          <img className="" src={inboxIcon}></img>
                          <h1>{room.title}</h1>
                          </Link>
                        </div>
                      </>
                    )
                  }
                }
              }
            })}
          </div>
        </div>
      </div>
    </>
  )
}


export default ChatInbox;