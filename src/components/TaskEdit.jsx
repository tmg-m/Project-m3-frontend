import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../services/api.service";

function TaskEdit () {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    discription: '',
    hot: false,
    imgUrl: '',
  });

  useEffect(() => {
    apiService.getSingleTask(id).then((response) => setForm({
      title: response.data.title,
      discription: response.data.discription,
      hot: response.data.hot,
      imgUrl: response.data.imgUrl,
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

  const editMyTask = async () => {
    apiService.editTask(id, form)
    navigate(`/task/${id}`)
  }

  return (
    <>
      <form onSubmit={editMyTask}>
        <input type="text" name="title" value={form.title} onChange={handleForm}/>
        <input type="text" name="discription" value={form.discription} onChange={handleForm}/>
        <input type="file" name="imgUrl" value={form.imgUrl}onChange={handleForm}/>
        <button type="submit">save</button>
      </form>
    </>
  )
}

export default TaskEdit;
