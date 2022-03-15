import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api.service";

function TaskCreate() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    discription: '',
    hot: false,
    imgUrl: '',
  });

  const handleForm = (e) => {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }

  const handleFormCheck = (e) => {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.checked,
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

  const handleSubmit = () => {
    console.log(form);
    console.log("i am here");
    apiService.createTask(form)
    console.log("created");
    navigate(`/task`)
  }

  console.log(form);

  return (
    <>
      <form className="create-form" onSubmit={handleSubmit} >
        <label>Title</label>
        <input type="text" name="title" onChange={handleForm} />
        <label>Discription</label>
        <input type="text" name="discription" onChange={handleForm} />
        <label>Hot</label>
        <input type="checkbox" name="hot" onChange={handleFormCheck} />
        <label>Image</label>
        <input type="file" name="imgUrl" onChange={handleImgaeUpload} />
        <button className="create-btn" type="submit">Create</button>
      </form>
    </>
  )
}

export default TaskCreate;