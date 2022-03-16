import { useEffect, useState } from "react";
import Search from "../components/Search";

import apiService from "../services/api.service";
import TaskCard from "../pages/TaskCard";

// import Task from "../components/Task";
import '../css/base.css'
import TaskCreate from "./TaskCreate";

function Home() {

  const [createTask, setCreateTask] = useState(false);
  const [allTaskDb, setAllTaskDb] = useState(null);
  const [allTask, setAllTask] = useState([]);

  useEffect(() => {
    apiService.getTasks().then((response) => setAllTaskDb(response.data))
  }, []);

  useEffect(() => {
    if(allTaskDb){
      setAllTask(allTaskDb)
    }
  }, [allTaskDb]);

  const handleCreate = () => {
    setCreateTask((createTask) => !createTask);
  }

  const taskSearch = (input) => {
    if (input === '') {
      setAllTask(allTask);
    } else {
      setAllTask(
        allTask.filter((item) =>
          item.title.toLowerCase().includes(input.toLowerCase())
        )
      );
    }
  };

  console.log(allTaskDb);
  
  return (
    <div>
      <h1 className="page-title">Home</h1>
      <Search onSearch={taskSearch} />
      <button className="create-btn center" onClick={handleCreate}>Create Task</button>
      <div>{createTask ? <TaskCreate/> : <></>}</div>
      <>
        {allTask.map((task, i) => {
          return (
            <TaskCard key={i} id={task._id} title={task.title} discription={task.discription} creator={task.creator} hot={task.hot} imgUrl={task.imgUrl} assist={task.assist} />
          )
        }).reverse()}
      </>
    </div>
  );
}

export default Home;
