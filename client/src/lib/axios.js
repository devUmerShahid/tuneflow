import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://tuneflow-aa8u.onrender.com/api',
  withCredentials: true   // This sends the cookie
})

// Optional: Log requests in dev
// api.interceptors.request.use(config => {
//   console.log("Request:", config.method "to" config.url);
//   return config;
// });

export default api;