import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import apiService from '../services/api.service';
import '../css/base.css';
import TaskCreate from './TaskCreate';
import { AuthContext } from '../context/auth.context';

function UserProfile() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [userTask, setUserTask] = useState({});
  const { user, isLoading } = useContext(AuthContext);

  const [createTask, setCreateTask] = useState(false);

  const [isVisible, setEditVisible] = useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      if (user._id === id) {
        setEditVisible(true)
      }
    }
  }, [user, isLoading, id]);

  let showUp = { "color": "black"}
  const handleCreate = () => {
    setCreateTask((createTask) => !createTask);
  }

  useEffect(() => {
    apiService.getUser(id).then(response => {
      setUserInfo(response.data.user);
      setUserTask(response.data.userTask);
    });
  }, []);

  return (
    <>
      <h1 className="page-title">User profile</h1>
      <img src={userInfo.imgUrl}></img>
      <h1>Name: {userInfo.name}</h1>
      <h2>Tasks Created : {userTask.length}</h2>
      <br></br>
      <br></br>
      <br></br>
      {isVisible ? <Link to={`/user/${id}/edit`}>Edit-profile</Link> : null}
      <br></br>
      <br></br>
      {isVisible ? <button onClick={handleCreate}>Create Task</button> : null}
      <div style={showUp} >{createTask ? <TaskCreate /> : null }</div>
    </>
  );
}
export default UserProfile;