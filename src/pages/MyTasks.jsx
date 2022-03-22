import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import apiService from "../services/api.service";
import '../css/task.css'

function MyTasks () {
  const [allMyTask, setAllMyTask] = useState([]);

  useEffect(() => {
    apiService.getMyTasks().then((response) => setAllMyTask(response.data.tasks))
  }, []);

  return(
    <>
      <div className="myTask-container">
        <div>
          {allMyTask.map((task, i) => {
            return (
              <TaskCard key={i} id={task._id} title={task.title} discription={task.discription} creator={task.creator} hot={task.hot} imgUrl={task.imgUrl} assist={task.assist} />
            )
          }).reverse()}
        </div>
      </div>
    </>
  )
}

export default MyTasks