import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api.service";
import '../css/task.css';

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

  const handleSubmit = async () => {
    try {
      await apiService.createTask(form);
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="create-container">
      <form className="create-form" onSubmit={handleSubmit} >
        <div className="input-manager">
          <label >Title</label>
          <input type="text" name="title" onChange={handleForm} />
        </div>
        <div className="input-manager">
          <label>Discription</label>
          <textarea type="text" name="discription" onChange={handleForm} />
        </div>
        <div className="high-priority flex-column flex-center color-white">
          <label>High priority</label>
          <input type="checkbox" name="hot" onChange={handleFormCheck} />
        </div>
        <div className="upload" >
          <label>Upload Image</label>
          <input type="file" name="imgUrl" onChange={handleImgaeUpload} />
        </div>
        <button className="create-btn-form" type="submit">Create Task</button>
      </form>
    </div>
  )
}

export default TaskCreate;