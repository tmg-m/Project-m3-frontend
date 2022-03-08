import { useEffect, useState } from "react";
import apiService from "../services/api.service";
import TaskCard from "../pages/TaskCard";

function Task() {

  const [allTask, setAllTask] = useState([]);

  useEffect(() => {
    apiService.getTasks().then((response) => setAllTask(response.data))
  }, []);

  return (
    <>
      {allTask.map((task, i) => {
        return (
            <TaskCard key={i} id={task._id} title={task.title} discription={task.discription}/>
        )
      })}
    </>
  )
}

export default Task;