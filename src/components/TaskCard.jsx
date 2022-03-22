import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/task.css'
import apiService from "../services/api.service";
import taskIcon from '../css/icons/task.png'
import communityIcon from '../css/icons/community.png'
import hotIcon from '../css/icons/hot.png'

function TaskCard({ id, title, imgUrl, creator, hot, assist  }) { // props from Task Component in Component folder

  const [creatorData, setCreatorData] = useState({});

  useEffect(() => {
    apiService.getUser(creator).then((response) => { setCreatorData(response.data.user) })
  }, []);

  return (
    <>
      <Link to={`/task/${id}`}>
        <div className="card">
          <div className="task-title">
            <img src={taskIcon}></img>
            <p>{title}</p>
          </div>
          <p>Creator: {creatorData.name}</p>
          <div className="priority">{hot ? <img src={hotIcon}></img> : null}</div>
          <div className="community-contain">
            <p>{assist.length}</p>
            <img src={communityIcon}></img>
          </div>
          <img src={imgUrl}></img>
        </div>
      </Link>
    </>
  )
}

export default TaskCard;