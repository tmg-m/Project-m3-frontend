import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
// import apiService from '../services/api.service';
// import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const { user } = useContext(AuthContext);

/*   const navigate = useNavigate(); */
  console.log(user);

 /*  useEffect(() => {
    apiService.getTasks().then(() => setstate)
  }, []);

  handleSubmit(() => {
    apiService.createTask(body).then(() => {
      navigate('/tasks');
    })
  }, []); */

  return (
    <>
      <h1>User profile</h1>
    </>
  )
}
export default UserProfile;