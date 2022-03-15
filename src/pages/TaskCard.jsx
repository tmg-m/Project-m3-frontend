import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/task.css'
import apiService from "../services/api.service";
//import TaskDetail from "./TaskDetail";

function TaskCard({ id, title, imgUrl, creator, hot, /* assist  */}) { // props from Task Component in Component folder

  const [creatorData, setCreatorData] = useState({});

  useEffect(() => {
    apiService.getUser(creator).then((response) => { setCreatorData(response.data.user)})
  }, []); 


  return (
    <>
      <Link to={`/task/${id}`}>
        <div className="card">

          <h1>Title: {title}</h1>
          <img src={imgUrl}></img>
          <h1>Creator: {creatorData.name}</h1>
          <h1>Hot: {hot? <p>true</p> : <p>false</p>}</h1>
        </div>
      </Link>
    </>
  )
}

export default TaskCard;