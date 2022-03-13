import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api.service";

function TaskCreate () {
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

  const handleSubmit = () => {
    apiService.createTask(form)
    navigate(`/`)
  }

  return (
    <>
      <form className="create-form" onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" name="title" onChange={handleForm}/>
        <label>Discription</label>
        <input type="text" name="discription" onChange={handleForm}/>
        <label>Hot</label>
        <input type="checkbox" name="hot" onChange={handleForm}/>
        <label>Image</label>
        <input type="file" name="imgUrl" onChange={handleForm}/>
        <button className="create-btn" type="submit">Create</button>
      </form>
    </>
  )
}

export default TaskCreate;