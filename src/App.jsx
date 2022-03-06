import { Route, Routes } from 'react-router-dom';
import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate';
import Navbar from './components/Navbar';
import Task from './components/Task';
import TaskCreate from './components/TaskCreate';
import TaskDetail from './components/TaskDetail';
import TaskEdit from './components/TaskEdit';
import UserProfile from './components/UserProfile';
import { AuthProviderWrapper } from './context/auth.context';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <AuthProviderWrapper>
      <Navbar />
      <Routes>
        <Route path="/" element={<IsPrivate>
          <Home />
        </IsPrivate>} />
        <Route path="/task" element={<Task />} />
        <Route path='/task/:id' element={<TaskDetail/>} />
        <Route path='/task/:id/edit' element={<TaskEdit/>}/>
        <Route path='/task/create' element={<TaskCreate/>}/>

        <Route path="/user/profile" element={
          <UserProfile />
        } />

        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </AuthProviderWrapper>
  );
}

export default App;
