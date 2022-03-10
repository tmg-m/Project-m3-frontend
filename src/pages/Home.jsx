import { useState } from "react";
import Task from "../components/Task";
import '../css/base.css'
import TaskCreate from "./TaskCreate";

function Home() {

  const [createTask, setCreateTask] = useState(false);

  const handleCreate = () => {
    setCreateTask((createTask) => !createTask);
  }
  
  return (
    <div>
      <h1 className="page-title">Home</h1>
      <button onClick={handleCreate}>Create Task</button>
      <div>{createTask ? <TaskCreate/> : <></>}</div>
      <Task />
    </div>
  );
}

export default Home;
