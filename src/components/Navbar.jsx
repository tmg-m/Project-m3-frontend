import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import '../css/base.css';
import homeIcon from '../css/icons/Home.png';
import inboxIcon from '../css/icons/inbox.png';
/* import taskIcon from '../css/icons/task.png'; */
import userIcon from '../css/icons/userProfile.png'
import communityIcon from '../css/icons/community.png';
import usersIcon from '../css/icons/users.png';
import aboutIcon from '../css/icons/about.png';
import logoutIcon from '../css/icons/logout.png';
import menu from '../css/icons/nav-menu.png'

function Navbar() {
  const { isLoggedIn, user, logOutUser, isLoading } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [toggleNav, setToggleNav] = useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      setUserData(user);
    }
  }, [user, isLoading]);

  const hideNav = async () => {
    try {
      await setToggleNav(false)
    } catch (error) {
      console.log(error);
    }
  }

  const showNav = () => {
    setToggleNav(true)
  }

  if (isLoggedIn && !toggleNav){
    return (
      <div className='burger-menu'>
        <button onClick={showNav}><img src={menu}></img></button>
      </div>
      
    )
  }

  return (
    <div>
      {isLoggedIn && (
        <div style={!toggleNav ? { display: "none" } : { display: "" }} className="nav-control">
          <div className='Nav-logo'>
            <h1>Work Floo</h1>
          </div>
          <div className="nav-content" onClick={hideNav}>
            <div>
              <Link className="nav-link" to={`/`}>
                <img src={homeIcon}></img>
                <button>Home</button>
              </Link>
            </div>
            <div>
              <Link className="nav-link" to="/chatInbox">
                <img src={inboxIcon}></img>
                <button>Inbox</button>
              </Link>
            </div>
            <div>
              <Link className="nav-link" to="/community">
                <img src={communityIcon}></img>
                <button>Community</button>
              </Link>
            </div>
            <div>
              <Link className="nav-link" to={`/user`}>
                <img src={usersIcon}></img>
                <button> Discover Users</button>
              </Link>
            </div>
            <div>
              <Link className="nav-link" to={`/user/${userData._id}`}>
                <img className="userIcon" src={userIcon}></img>
                <button>Profile</button>
              </Link>
            </div>
            <div>
              <Link className="nav-link" to={`/about`}>
                <img src={aboutIcon}></img>
                <button>About</button>
              </Link>
            </div>
            <div className="nav-link logout-btn">
              <img src={logoutIcon}></img>
              <button onClick={logOutUser}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
