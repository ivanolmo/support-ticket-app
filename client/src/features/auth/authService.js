import axios from 'axios';

const API_URL = '/api/users';
const API_LOGIN = 'api/users/login';

// register
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// login
const login = async (userData) => {
  const response = await axios.post(API_LOGIN, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// logout
const logout = () => localStorage.removeItem('user');

const authService = {
  register,
  login,
  logout,
};

export default authService;
