import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext)

  return (
    <nav>
      {isLoggedIn && (
        <>
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/task">
            <button>Task</button>
          </Link>
          <Link to="user/profile/">
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
    </nav >
  );
}

export default Navbar;
