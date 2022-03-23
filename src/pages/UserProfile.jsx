import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import apiService from '../services/api.service';
import '../css/base.css';
import TaskCreate from '../components/TaskCreate';
import { AuthContext } from '../context/auth.context';
import TaskCardXs from '../components/TaskCardXs';
import profileIcon from '../css/icons/userProfile.png'
import '../css/profile.css'
import UserIcon from '../components/userIcon';

function UserProfile() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [userTask, setUserTask] = useState([]);
  const { user, isLoading } = useContext(AuthContext);
  const [createTask, setCreateTask] = useState(false);
  const [isVisible, setEditVisible] = useState(false);
  const [messageBtn, setMessageBtn] = useState(true);
  const [conversation, setConversation] = useState(false);
  const [convoId, setConvoId] = useState({ id: "" });
  const [pageUserName, setPageUserName] = useState({
    secondUserName: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      if (user._id === id) {
        setEditVisible(true)
        setMessageBtn(false)
      }
    }
  }, [user, isLoading, id]);

  let showUp = { "color": "black" }
  const handleCreate = () => {
    setCreateTask((createTask) => !createTask);
  }

  useEffect(() => {
    apiService.getUser(id).then(response => {
      setUserInfo(response.data.user);
      setUserTask(response.data.userTask);
      setPageUserName({ secondUserName: response.data.user.name })
    });
  }, []);

  useEffect(() => {
    checkConvr()
  }, [userTask]);

  const checkConvr = async () => {
    try {
      const allChat = await apiService.getAllChat();
      allChat.data.filter((chat) => {
        if (!isLoading && user) {
          if (!("relatedTask" in chat && chat.users.length > 1)) {
            if (chat.users.includes(id) && chat.users.includes(user._id)) {
              setConversation(true)
              setConvoId({ id: chat._id })
            }
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  const handleChat = async () => {
    try {
      const chat = await apiService.CreateChatThisUser(id, pageUserName);
      const chatId = chat.data.chatRoomForUsers._id;
      if (chatId !== undefined || chatId !== null || chatId === true) {
        navigate(`/chat/${chatId}`);
      } else {
        console.log()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='profile-container'>
        <UserIcon />
        <img src={userInfo.imgUrl}></img>

        <div className='profile-controller'>

          <div className='detail-message-control'>
            <div className='user-info'>
              <div className='user'>
                <div className='user-only'>
                  <img src={profileIcon}></img>
                  <h1>{userInfo.name}</h1>
                </div>
                {isVisible ? <Link className='userBtns' to={`/user/${id}/edit`}>Edit</Link> : <>
                  {!isVisible ? <>{conversation ? <Link className='userBtns' to={`/chat/${convoId.id}`}>Open chat</Link> : <>{messageBtn ? <button className='userBtns' onClick={handleChat}>Message</button> : null}</>}</> : null}
                </>}
              </div>
              <div className='user-detail'>
                <h2>Tasks: {userTask.length}</h2>
              </div>
            </div>
          </div>
          <div>
            <div style={showUp} >{createTask ? <TaskCreate /> : null}</div>
            {isVisible ? <button className='createBtn' onClick={handleCreate}>Create Task</button> : null}
          </div>

          <div>
            {userTask.map((task, i) => {
              return (
                <>
                  <TaskCardXs key={i} id={task._id} title={task.title} imgUrl={task.imgUrl} assist={task.assist} />
                </>
              )
            }).reverse() }
          </div>

        </div>
      </div>

    </>
  );
}
export default UserProfile;