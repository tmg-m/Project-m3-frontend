import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import '../css/base.css';

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser, isLoading } = useContext(AuthContext);

  // console.log(user);
  // Need Sum Help
  /*   const [userData, setUserData] = useState({}); */

  /*   useEffect(() => {
    setUserData(user)
  }, []); */

  if(!isLoading){
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
            <Link to={`/user/6219fa6964eda2024bbf6c64`}>  {/* hard coded user || i like to add ${user._id} from auth without it crashing after refreshing browser*/} 
              <button>Profile</button>
            </Link>
            <button onClick={logOutUser}>Logout</button>
            <span>{user && user.name}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <h1>loading ..... </h1>
    </div>
  )

  }

  

export default Navbar;
