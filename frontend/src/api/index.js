import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

axios.interceptors.request.use(
  config => {
    return Promise.resolve(config);
  },
  error => {
    if (error.response.status === 401) {
      window.location.href = '/sign-in';
    }
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  error => {
    if (error.response.status === 401) {
      window.location.href = '/sign-in';
    }
    return Promise.reject(error);
  }
);

export default api