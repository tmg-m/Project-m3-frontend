import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import apiService from "../services/api.service";
import roomIcon from '../css/icons/room.png'
import '../css/community.css'
import UserIcon from "../components/userIcon";

function Community() {
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
          <h1>Community</h1>
          <div>
            {data.map((room, i) => {
              if (!isLoading && user) {
                if ('relatedTask' in room) {
                  if (room.users.includes(user._id)) {
                    return (
                      <>
                        <div className="room-title" key={i}>
                          <Link className="room-controller" to={`/chat/${room._id}`}>
                            <img src={roomIcon}></img>
                            <h1>{room.title}</h1></Link>
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


export default Community;