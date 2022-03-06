import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../services/api.service';
// import apiService from '../services/api.service';

function UserProfile() {
  const { id } = useParams()
  const [user, setUser] = useState({});
  const [userTask, setUserTask] = useState({});

  useEffect(() => {
    apiService.getUser(id).then((response) => {setUser(response.data.user), setUserTask(response.data.userTask)})
  }, []);

  return (
    <>
    <h1>{user.name}</h1>
    <h2>{userTask.length}</h2>
    </>
  )
}
export default UserProfile;