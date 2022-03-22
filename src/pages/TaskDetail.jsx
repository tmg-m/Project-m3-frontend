import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import apiService from "../services/api.service";
// import hotIcon from '../css/icons/hot.png'

function TaskDetail() {
  const { id } = useParams();
  const { user, isLoading } = useContext(AuthContext);
  const [task, setTask] = useState({});
  const [creator, setCreator] = useState({});
  const [editVisible, setEditVisible] = useState(false);
  const [joinToggle, setJoinToggle] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState(null);

  // gets selected task with userId from payload (logged in user)
  useEffect(() => {
    const data = async () => {
      try {
        const task = await apiService.getSingleTask(id);
        setTask(task.data.task);
        setLoggedUserId(task.data.userId)
      } catch (error) {
        console.log(error);
      }
    }
    data();
  }, []);

  useEffect(() => {
    if (loggedUserId) {
      if (task.assist.includes(loggedUserId)) {
        setJoinToggle(true)
      }
    }
  }, [loggedUserId]);

  // gets creator's data
  useEffect(() => {
    apiService.getUser(task.creator).then((response) => setCreator(response.data.user))
  }, [task]);

  // Visible edit button, checks weather logged user and creator is the same.
  useEffect(() => {
    if (!isLoading && user) {
      if (user._id === task.creator) {
        setEditVisible(true);
      }
    }
  }, [user, isLoading, task]);

  // Join
  const handleJoin = async () => {
    try {
      await apiService.assistJoin(id);
      const allChat = await apiService.getAllChat();
      let chatRoomId;
      allChat.data.map((room) => {
        if (room.relatedTask === id) {
          chatRoomId = room._id
        }
      })
      await apiService.joinChatRoom(chatRoomId);
      setJoinToggle(true);
    } catch (error) {
      console.log(error);
    }
  }

  // Un Join
  const handleUnJoin = async () => {
    try {
      await apiService.assistUnJoin(id);
      const allChat = await apiService.getAllChat();
      let chatRoomId;
      allChat.data.map((room) => {
        if (room.relatedTask === id) {
          chatRoomId = room._id
        }
      })
      await apiService.unJoinChatRoom(chatRoomId);
      setJoinToggle(false);

    } catch (error) {
      console.log(error);
    }
  }



  return (
    <>
      <div className="taskDetail-container">
        <div className="detail-controller">
          <p className="title-discription">{task.title}</p>
          {/* {task.hot ? <img className="detail-priority" src={hotIcon}></img> : null} */}
          <img src={task.imgUrl}></img>
          <p>{task.discription}</p>
          <Link to={`/user/${creator._id}`}>
            <h2>Creator: {creator.name}</h2>
          </Link>
          
          <p>Help desk: {task.assist}</p>

          <div className="toggleJoinxEdit">
            {editVisible ? <button style={{ backgroundColor: "black" }} className="toggleBtn" ><Link className="edit-link " to={`/task/${id}/edit`}>Edit</Link></button> : <>{joinToggle ? <button style={{ backgroundColor: "rgb(254, 84, 84)" }} className="toggleBtn" onClick={handleUnJoin}>Leave</button> : <button className="toggleBtn" style={{ backgroundColor: "rgb(51, 155, 65)" }}  onClick={handleJoin}>Join</button>}</>}
          </div>
        </div>
      </div>
    </>
  )
}

export default TaskDetail;