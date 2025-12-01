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

export default api






// import axios from 'axios'

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,// || 'http://localhost:5000/api',
//   //baseURL: 'https://tuneflow-aa8u.onrender.com/api',
//   withCredentials: true, // important for cookies
// })

// // Optional: add request interceptor to attach token if you switch to localStorage later
// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('token')
//   if (token) config.headers.Authorization = `Bearer ${token}`
//   return config
// })

// export default api   





// import { configureStore } from '@reduxjs/toolkit'
// import authSlice from '../features/auth/authSlice'
// import playerSlice from '../features/player/playerSlice'

// export const store = configureStore({
//   reducer: {
//     auth: authSlice,
//     player: playerSlice,
//   },
// })
// export default api;