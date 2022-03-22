
import { Link } from "react-router-dom";
import taskIcon from '../css/icons/task.png'
import communityIcon from '../css/icons/community.png'
import '../css/task.css'


function TaskCardXs({ id, title, imgUrl, assist }) { // props from Task Component in Component folder
  
  return (
    <>
      <Link to={`/task/${id}`}>
        <div className="task-xs">
        <div ></div>
          <div className="taskTitle">
            <img src={taskIcon}></img>
            <h1>{title}</h1>
          </div>
          <div className="assists">
            <h1>{assist.length}</h1>
            <img src={communityIcon}></img>
          </div>
          <img src={imgUrl}></img>
        </div>
      </Link>
    </>
  )
}

export default TaskCardXs;