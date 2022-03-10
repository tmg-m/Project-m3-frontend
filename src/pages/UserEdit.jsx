import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import apiService from "../services/api.service";

function UserEdit() {
  const { logOutUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const {id} = useParams(); 
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    imgUrl: '',
    about: '',
  });

  useEffect(() => {
    apiService.getUser(id).then((response) => setForm({
      email: response.data.user.email,
      password: response.data.user.password,
      name: response.data.user.name,
      /* imgUrl: response.data.user.imgUrl, */
      about: response.data.user.about,
    }))
  }, []);

  const handleForm = (e) => {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }

  const editMyProfile = async () => {
    apiService.editUser(id, form)
    navigate(`/user/${id}`)
  }

  const deleteAccount = async () => {
   try {
     await apiService.deleteUser(id);
     logOutUser();
     navigate(`/`);
   } catch (error) {
     console.log(error);
   }
  }

  return (
    <>
      <form onSubmit={editMyProfile}>
        <label>Profile pic</label>
        <input type="file" name="imgUrl" value={form.imgUrl} onChange={handleForm} />
        <br></br>
        <label>Email</label>
        <input type="text" name="email" value={form.email} onChange={handleForm} />
        <br></br>
        <label>Name</label>
        <input type="text" name="name" value={form.name} onChange={handleForm} />
        <br></br>
        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleForm} />
        <br></br>
        <label>About</label>
        <input type="text" name="about" value={form.about} onChange={handleForm} />
        <br></br>
        <button type="submit">save</button>
      </form>
      <button onClick={deleteAccount} >Delete Account</button>
    </>
  )
}

export default UserEdit;