import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api/messages', // Adjust URL if needed
});

export default api;
