import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/base.css'
import apiService from '../services/api.service';

function TaskPage() {

  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    apiService.getAllUser().then((response) => { setAllUser(response.data) })
  }, []);
  console.log(allUser);
  return (
    <>
      {allUser.map((user) => {
        return(
          <>
          <Link to={`/user/${user._id}`}>
              <div style={{border: "1px solid red", margin: "10px"}}>
                <h1>Name: {user.name}</h1>
                <img src={user.imgUrl}></img>
              </div>
          </Link>
          </>
        )
      })}
      
    </>
  );
}

export default TaskPage;
