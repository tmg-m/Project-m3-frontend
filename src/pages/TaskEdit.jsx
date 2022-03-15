import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../services/api.service";

function TaskEdit() {
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
    apiService
      .imgUpload(uploadData)
      .then(response => {
        setForm((prev) => {
          return {
            ...prev,
            imgUrl: response.data.cloudUrl
          }
        });
      })
      .catch(error => console.log(error));
  };

  const editMyTask = async () => {
    apiService.editTask(id, form)
    navigate(`/task/${id}`)
  }

  const deleteTask = async () => {
    apiService.deleteTask(id)
    navigate(`/task`)
  }

  console.log(form);


  return (
    <>
      <form onSubmit={editMyTask}>
        <label>Title</label>
        <input type="text" name="title" value={form.title} onChange={handleForm} />
        <label>Discription</label>
        <input type="text" name="discription" value={form.discription} onChange={handleForm} />
        <label>Hot</label>
        <input type="checkbox" name="hot" checked={form.hot} onChange={handleFormCheck} />
        <label>Image</label>
        <input type="file" name="imgUrl" onChange={handleImgaeUpload} />
        <button type="submit">save</button>
      </form>
      <button onClick={deleteTask} >Delete Task</button>
    </>
  )
}

export default TaskEdit;
