import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api.service';
import '../css/users.css'


function AllUserPage() {

  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    apiService.getAllUser().then((response) => { setAllUser(response.data) })
  }, []);

  return (
    <>
      <div className='allUser'>
        <div className='allUser-div-controller'>
          <h1>Discover Users</h1>
          {allUser.map((user) => {
            return (
              <>
                <div className='user-controller'>
                  <Link to={`/user/${user._id}`}>
                    <div className='user-card' >
                      <img className='round' src={user.imgUrl}></img>
                      <h1>{user.name}</h1>
                    </div>
                  </Link>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </>
  );
}

export default AllUserPage;
