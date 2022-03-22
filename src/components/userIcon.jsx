import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import userIcon from '../css/icons/userProfile.png'

function UserIcon () {
  const { user, isLoading } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if(!isLoading && user){
      setUserData(user)
    }
  }, [user, isLoading]);

  if(!userData){
    return (
      <>
        <h1>loading</h1>
      </>
    )
  }
  return (
    <>
      <Link to={`/user/${user._id}`}>
        <div className="userIconHome">
          <img src={userIcon}></img>
        </div>
      </Link>
    </>
  )
  

}

export default UserIcon