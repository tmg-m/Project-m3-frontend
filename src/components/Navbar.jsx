import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import '../css/base.css';

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser, isLoading } = useContext(AuthContext);

  // console.log(user);
  // Need Sum Help
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!isLoading && user) {
      setUserData(user)
    }
  }, [user, isLoading]);
  console.log({ isLoading, user });


  /* if not userData show loading screen */
  if (!userData) {
    return (<div>
      <h1>loading ..... </h1>
    </div>)
  }

  return (
    <div>
      {isLoggedIn && (
        <div className="nav">
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/task">
            <button>Task</button>
          </Link>
          <Link to={`/user/${userData._id}`}>  {/* hard coded user || i like to add ${user._id} from auth without it crashing after refreshing browser*/}
            <button>Profile</button>
          </Link>
          <button onClick={logOutUser}>Logout</button>
          <span>{userData.name}</span>
        </div>
      )}
    </div>
  )
}

export default Navbar;
