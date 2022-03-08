import { Route, Routes } from 'react-router-dom';
import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate';
import Navbar from './components/Navbar';
import TaskCreate from './pages/TaskCreate';
import TaskDetail from './pages/TaskDetail';
import TaskEdit from './pages/TaskEdit';
import UserEdit from './pages/UserEdit';
import UserProfile from './pages/UserProfile';
import { AuthProviderWrapper } from './context/auth.context';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TaskPage from './pages/TaskPage';

function App() {
  return (
    <AuthProviderWrapper>
      <Routes>
        <Route
          path="/"
          element={
            <IsPrivate>
              <Home />
            </IsPrivate>
          }
        ></Route>
        <Route path="/task" element={<TaskPage />} />
        <Route path="/task/:id" element={<TaskDetail />} />
        <Route path="/task/:id/edit" element={<TaskEdit />} />
        <Route path="/task/create" element={<TaskCreate />} />

        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="user/:id/edit" element={<UserEdit />} />

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
      <Navbar />
    </AuthProviderWrapper>
  );
}

export default App;
