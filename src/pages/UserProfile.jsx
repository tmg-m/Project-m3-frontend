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
      <h1>{userInfo.name}</h1>
      <h2>{userTask.length}</h2>
      <Link to={`/user/${id}/edit`}>Edit-profile</Link>
      <br></br>
      <button onClick={handleCreate}>Create Task</button>
      <div>{createTask ? <TaskCreate /> : <></>}</div>
    </>
  );
}
export default UserProfile;