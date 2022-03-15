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

  useEffect(() => {
    apiService.getSingleTask(id).then((response) => setTask(response.data))
  }, []);

  useEffect(() => {
    apiService.getUser(task.creator).then((response) => setCreator(response.data.user))
  }, [task]);

  useEffect(() => {
    if (!isLoading && user) {
      if(user._id === task.creator){
        setEditVisible(true)
      }
    }
  }, [user, isLoading, task]);

  console.log(task);

  return (
    <>
      <h1>Title: {task.title}</h1>
      <h2>Detail: {task.discription}</h2>
      <Link to={`/user/${creator._id}`}>
        <h2>Creator: {creator.name}</h2>
      </Link>
      <h2>Help desk: {task.assist} 0</h2>
      <h2>hot: {task.hot ? <p>true</p> : <p>false</p>}</h2>
      <h1>imgUrl: {task.imgUrl}</h1>
      
      {editVisible ? <Link to={`/task/${id}/edit`}>edit</Link> : null}
    </>
  )
}

export default TaskDetail;