import { Link } from "react-router-dom";
//import TaskDetail from "./TaskDetail";

function TaskCard({ id, title, imgUrl, /*  hot, assist */ }) {
  return (
    <>
     <Link to={`/task/${id}`}>
        <h1>{title}</h1>
        <img src={imgUrl}></img>
     </Link>
    </>
  )
}

export default TaskCard;