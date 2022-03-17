import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import apiService from "../services/api.service";

function Chat() {
  const { isLoading } = useContext(AuthContext);
  const [data, setData] = useState([]);

    useEffect(() => {
      apiService.getChatRoom().then(response => {
        setData(response.data);
      });
    }, []);

    console.log(data)

    return (
      <>
        <h1>title: {data.title}</h1>
        {!isLoading ? <h1>user: {data.users}</h1> : null}
      </>
    )
  }


export default Chat;