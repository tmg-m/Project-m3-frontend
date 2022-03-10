import { Link } from "react-router-dom";
import '../css/task.css'
//import TaskDetail from "./TaskDetail";

function TaskCard({ id, title, imgUrl, /*  hot, assist */ }) {
  return (
    <>
      <Link to={`/task/${id}`}>
        <div className="card">
          <h1>{title}</h1>
          <img src={imgUrl}></img>
        </div>
      </Link>
    </>
  )
}

export default TaskCard;