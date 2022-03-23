import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Navigate } from 'react-router-dom';
import loadingImg from '../css/icons/loading.gif'

function IsAnon({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // If the authentication is still loading ⏳
  if (isLoading) return <img className='loading-img' src={loadingImg}></img>;

  if (isLoggedIn) {
    // If the user is logged in, navigate to home page ❌
    return <Navigate to="/" />;
  } else {
    // If the user is not logged in, allow to see the page ✅
    return children;
  }
}

export default IsAnon;
