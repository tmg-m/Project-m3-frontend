import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import '../css/auth.css'
import backBg from '../css/icons/triangle-bg.jpeg'

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value);

  const handleLoginSubmit = e => {
    e.preventDefault();
    const requestBody = { email, password };
    
    login(requestBody)
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="Page">
      <img className='bgImg' src={backBg}></img>
      <div className='page-contents'>
        <h1>WORK FLOO</h1>
        <form className="auth-form" onSubmit={handleLoginSubmit}>
          <div className='auth-input-manager'>
            <label>Email</label>
            <input type="email" name="email" value={email} onChange={handleEmail} />
          </div>

          <div className='auth-input-manager' >
            <label>Password</label>
            <input type="password" name="password" value={password} onChange={handlePassword} />
          </div>

          <button className="auth-btn" type="submit">Login</button>
        </form>
        <div className='flex-column flex-center'>
          <p>Dont have an account yet?</p>
          <Link className='signUp' to={'/signup'}> Sign Up</Link>
       </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
