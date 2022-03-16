import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import apiService from "../services/api.service";

function TaskDetail() {
  const { id } = useParams();
  const { user, isLoading } = useContext(AuthContext);
  const [task, setTask] = useState({});
  const [creator, setCreator] = useState({});
  const [editVisible, setEditVisible] = useState(false);
  const [joinToggle, setJoinToggle] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState(null);

  // gets selected task with userId from payload (logged in user)
  useEffect( () => {  
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
    if(loggedUserId){
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


  const handleJoin = async () => {
    try {
      await apiService.assistJoin(id);
      setJoinToggle(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleUnJoin = async () => {
    try {
      await apiService.assistUnJoin(id);
      setJoinToggle(false);

    } catch (error) {
      console.log(error);
    }
  }
  console.log(loggedUserId);

  return (
    <>
      <h1>Title: {task.title}</h1>
      <h2>Detail: {task.discription}</h2>
      <Link to={`/user/${creator._id}`}>
        <h2>Creator: {creator.name}</h2>
      </Link>
      <h2>Help desk: {task.assist}</h2>
      <h2>hot: {task.hot ? <p>true</p> : <p>false</p>}</h2>
      <img src={task.imgUrl}></img>

      {editVisible ? <Link to={`/task/${id}/edit`}>edit</Link> : <div>{joinToggle ? <button onClick={handleUnJoin}>un join</button> : <button onClick={handleJoin}>join</button>}</div>}
      


    </>
  )
}

export default TaskDetail;