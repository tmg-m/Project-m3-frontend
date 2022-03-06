import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext)

  // Need Sum Help
/*   const [userData, setUserData] = useState({}); */

/*   useEffect(() => {
    setUserData(user)
  }, []); */

  return (
    <div>
      {isLoggedIn && (
        <>
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/task">
            <button>Task</button>
          </Link>
          <Link to={`/user/6221054a3e18fa4013894139`}>
            <button>Profile</button>
          </Link>
          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>

        </>
      )
      }

      {
        !isLoggedIn && (
          <>
            <Link to="/signup">
              {' '}
              <button>Sign Up</button>{' '}
            </Link>
            <Link to="/login">
              {' '}
              <button>Login</button>{' '}
            </Link>
          </>
        )
      }
    </div>
  );
}

export default Navbar;
