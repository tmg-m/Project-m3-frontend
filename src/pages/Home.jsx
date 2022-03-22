import { useContext, useEffect, useState } from "react";
import Search from "../components/Search";
import apiService from "../services/api.service";
import TaskCard from "../components/TaskCard";
// import Task from "../components/Task";
import '../css/base.css'
import TaskCreate from "../components/TaskCreate";
import { AuthContext } from "../context/auth.context";
import UserIcon from '../components/userIcon'

function Home() {
  const { user, isLoading } = useContext(AuthContext);
  const [createTask, setCreateTask] = useState(false);
  const [allTaskDb, setAllTaskDb] = useState(null);
  const [allTask, setAllTask] = useState([]);

  useEffect(() => {
    apiService.getTasks().then((response) => setAllTaskDb(response.data))
  }, []);

  useEffect(() => {
    if (allTaskDb) {
      setAllTask(allTaskDb)
    }
  }, [allTaskDb]);

  //CreateTask toggle
  const handleCreate = () => {
    setCreateTask((createTask) => !createTask);
  }

  // Search
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

  if (isLoading && !user) {
    return (
      <p>page is loading</p>
    )
  }
  
  return (
    <div className="home">
      <UserIcon/>
      <h1 className="base-logo">WORK FLOO</h1>
      <Search onSearch={taskSearch} />
      <button className="create-btn" onClick={handleCreate}>Create Task</button>
      <div>{createTask ? <TaskCreate /> : <></>}</div>
      <div className="tasks">
        {allTask.map((task, i) => {
          return (
            <TaskCard key={i} id={task._id} title={task.title} discription={task.discription} creator={task.creator} hot={task.hot} imgUrl={task.imgUrl} assist={task.assist} />
          )
        }).reverse()}
      </div>
    </div>
  );
}

export default Home;
