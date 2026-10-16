import axios from 'axios';

// Backend Express server base URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Request එකක් යවද්දී LocalStorage එකේ JWT Token එක තිබුණොත් Header එකට attach කිරීම
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;