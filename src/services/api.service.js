import axios from 'axios';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:5005',
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use(config => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem('authToken');

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  login = requestBody => {
    return this.api.post('/auth/login', requestBody);
    // same as
    // return axios.post("http://localhost:5005/auth/login");
  };

  signup = requestBody => {
    return this.api.post('/auth/signup', requestBody);
    // same as
    // return axios.post("http://localhost:5005/auth/singup");
  };

  verify = () => {
    return this.api.get('/auth/verify');
    // same as
    // return axios.post("http://localhost:5005/auth/verify");
  };

  // Task

  getTasks = () => {
    return this.api.get('/task');
  }

  getSingleTask = (id) => {
    return this.api.get(`/task/${id}`)
  }

  editTask = (id, form) => {
    return this.api.put(`/task/${id}/edit`, form)
  }

  deleteTask = (id) => {
    return this.api.delete(`/task/${id}/delete`)
  }

  createTask = (form) => {
    return this.api.post(`/task/create`, form)
  }

  assistJoin = (id) => {
    return this.api.post(`/task/${id}/join`);
  }

  assistUnJoin = (id) => {
    return this.api.put(`/task/${id}/unJoin`);
  }

  // User

  getAllUser = () => {
    return this.api.get(`/user`)
  }
  
  getUser = (id) => {
    return this.api.get(`/user/${id}`)
  }

  getMyTasks = () => {
    return this.api.get(`/task/mine`);
  }

  editUser = (id, form) => {
    return this.api.put(`/user/${id}/edit`, form)
  }

  deleteUser = (id) => {
    return this.api.delete(`/user/${id}/delete`)
  }

  // Upload files

  imgUpload = file => {
    return this.api.post(`/imageUpload`, file)
  }

  // Chat 

  getAllChat = () => {
    return this.api.get(`/chat`);
  }

  getMyChatRoom = () => {
    return this.api.get(`/chat/mine`);
  }

  createChatRoom = (form) => {
    return this.api.post(`/chat/create`, form)
  }

  getChatRoom = (id) => {
    return this.api.get(`/chat/${id}`)
  }

  joinChatRoom = (id) => {
    return this.api.post(`/chat/${id}/join`)
  }

  unJoinChatRoom = (id) => {
    return this.api.put(`/chat/${id}/unJoin`)
  }

  // Message
  createMessage = () => {
    return this.api.post(`/message`)
  }
  
}

// Create one instance (object) of the service
const apiService = new ApiService();

export default apiService;
