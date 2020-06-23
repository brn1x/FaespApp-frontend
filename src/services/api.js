import axios from 'axios';

const api = axios.create({
  baseURL: "https://api-faespapp.herokuapp.com"
});

export default api;