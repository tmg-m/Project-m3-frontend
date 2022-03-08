import { useEffect, useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import apiService from '../services/api.service';
import '../css/base.css';
import { AuthContext } from '../context/auth.context';
// import apiService from '../services/api.service';

function UserProfile() {
  const { id } = useParams();
  // const [userInfo, setUserInfo] = useState({});
  const [userTask, setUserTask] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    apiService.getMyTasks().then(response => {
      setUserTask(response.data);
    });
  }, []);

  return (
    <>
      {console.log(user._id, userTask)}
      <h1 className="page-title">User profile</h1>
      <h1>{user.name}</h1>
      {/* <h2>{user.length}</h2> */}
      <Link to={`/user/${id}/edit`}>Edit</Link>
    </>
  );
}
export default UserProfile;
