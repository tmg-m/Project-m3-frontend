import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import apiService from "../services/api.service";
import '../css/edit.css'

function UserEdit() {
  const { logOutUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const { id } = useParams();
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

  const handleImgaeUpload = e => {
    const uploadData = new FormData();
    uploadData.append('imgUrl', e.target.files[0]);
    const cloud = async () => {
      try {
        const upload = await apiService.imgUpload(uploadData);
        setForm((prev) => {
          return {
            ...prev,
            imgUrl: upload.data.cloudUrl
          }
        })
      } catch (error) {
        console.log(error);
      }
    }
    cloud()
  };

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

  console.log(form);

  return (
    <>
      <div className="detail-container">
        <form className="form-controller" onSubmit={editMyProfile}>
          <div className="upload-img">
            <label>Profile pic</label>
            <input type="file" name="imgUrl" onChange={handleImgaeUpload} />
          </div>

          <div className="fomt-input">
            <label>Email</label>
            <input type="text" name="email" value={form.email} onChange={handleForm} />
          </div>

          <div className="fomt-input">
            <label>Name</label>
            <input type="text" name="name" value={form.name} onChange={handleForm} />
          </div>

          <div className="fomt-input">
            <label>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleForm} />
          </div>

          <div className="fomt-input">
            <label>About</label>
            <textarea type="text" name="about" value={form.about} onChange={handleForm} />
          </div>

          <button type="submit">save</button>
        </form>
        <button onClick={deleteAccount} >Delete Account</button>
      </div>
    </>
  )
}

export default UserEdit;