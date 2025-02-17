import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com', // nammo backend base url
  timeout: 10000,
});

export default api;