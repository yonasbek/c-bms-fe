import axios from 'axios';

const publicRequest = axios.create({
  baseURL: 'http://localhost:3000' , // adjust to your backend URL
});

const userRequest = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL||'http://localhost:3000' , // adjust to your backend URL
  });
  
  // Add a request interceptor to include the token in headers
  userRequest.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

export { publicRequest, userRequest };