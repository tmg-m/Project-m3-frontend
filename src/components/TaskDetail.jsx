import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../services/api.service";

function TaskDetail () {
  const [task, setTask] = useState({});
  const id = useParams();

  useEffect(() => {
    apiService.getSingleTask(id).then((response) => setTask(response.data))
  }, []);

  return (
    <>
      <h1>{task.title}</h1>
      <h2>{task.detail}</h2>
      <h2>{task.creator}</h2>
      <h2>{task.assist}</h2>
    </>
  )
}

export default TaskDetail;