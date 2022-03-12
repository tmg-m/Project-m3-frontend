import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import apiService from '../services/api.service';
import '../css/base.css';
import TaskCreate from './TaskCreate';
// import { AuthContext } from '../context/auth.context';
// import apiService from '../services/api.service';

function UserProfile() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [userTask, setUserTask] = useState({});
  // const { user } = useContext(AuthContext);

  const [createTask, setCreateTask] = useState(false);

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
      <h1>Name: {userInfo.name}</h1>
      <h2>Tasks Created : {userTask.length}</h2>
      <br></br>
      <br></br>
      <br></br>
      <Link to={`/user/${id}/edit`}>Edit-profile</Link>
      <br></br>
      <br></br>
      <button onClick={handleCreate}>Create Task</button>
      <div style={showUp} >{createTask ? <TaskCreate /> : null }</div>
    </>
  );
}
export default UserProfile;