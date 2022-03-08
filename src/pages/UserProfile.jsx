import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import apiService from '../services/api.service';
import '../css/base.css'
// import apiService from '../services/api.service';

function UserProfile() {
  const { id } = useParams()
  const [user, setUser] = useState({});
  const [userTask, setUserTask] = useState({});

  useEffect(() => {
    apiService.getUser(id).then((response) => { setUser(response.data.user), setUserTask(response.data.userTask) })
  }, []);

  return (
    <>
      <h1 className='page-title'>User profile</h1>
      <h1>{user.name}</h1>
      <h2>{userTask.length}</h2>
      <Link to={`/user/${id}/edit`} >Edit</Link>
    </>
  )
}
export default UserProfile;