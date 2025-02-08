// import axios from "axios"
// import 

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || "https://trendai-backend-lime.vercel.app",
// })

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token")
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

// export default api

import axios from "axios"
import Cookies from "js-cookie"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://trendai-backend-lime.vercel.app",
  withCredentials: true, // This allows the browser to send cookies with cross-origin requests
})

api.interceptors.request.use((config) => {
  const token = Cookies.get("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && !error.config._retry) {
      error.config._retry = true
      try {
        const res = await api.post("/auth/refresh")
        const { access_token } = res.data
        Cookies.set("token", access_token, { expires: 7 }) // Set cookie to expire in 7 days
        error.config.headers.Authorization = `Bearer ${access_token}`
        return api(error.config)
      } catch (refreshError) {
        Cookies.remove("token")
        window.location.href = "/login"
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  },
)

export default api

