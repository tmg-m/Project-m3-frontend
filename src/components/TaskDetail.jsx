import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiService from "../services/api.service";

function TaskDetail () {
  const [task, setTask] = useState({});
  const { id }= useParams();
  console.log(id)

  useEffect(() => {
    apiService.getSingleTask(id).then((response) => setTask(response.data))
  }, []);

  return (
    <>
      <h1>{task.title}</h1>
      <h2>{task.detail}</h2>
      <h2>{task.creator}</h2>
      <h2>{task.assist}</h2>
      <Link to={`/task/${id}/edit`}>edit</Link>
    </>
  )
}

export default TaskDetail;