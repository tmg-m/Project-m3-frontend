import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { AuthContext } from "../context/auth.context";
import apiService from "../services/api.service";

function TaskDetail () {
  const { id } = useParams();
  // const { user } = useContext(AuthContext);
  const [task, setTask] = useState({});
  const [creator, setCreator] = useState({});
  // const [editVisible, setEditVisible] = useState(false);

  useEffect(() => {
     apiService.getSingleTask(id).then((response) => setTask(response.data))
  }, []);

  useEffect(() => {
    apiService.getUser(task.creator).then((response) => setCreator(response.data.user))
  }, [task]);

  /* if(creator._id === user._id){
    setEditVisible(true)
  } */

  return (
    <>
      <h1>Title: {task.title}</h1>
      <h2>Detail: {task.discription}</h2>
      <h2>Creator: {creator.name}</h2>
      <h2>Help desk: {task.assist} 0</h2>
      <Link to={`/task/${id}/edit`}>edit</Link>   {/* line 32 Same problem from auth context, where refresh crashes everything */}
      {/* {editVisible ? <Link to={`/task/${id}/edit`}>edit</Link> : null } */}  
    </>
  )
}

export default TaskDetail;