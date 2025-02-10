import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://trendai-backend-lime.vercel.app",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  // (response) => response,
  // (error) => {
  //   if (error.response?.status === 401) {
  //     if (typeof window !== "undefined") {
  //       localStorage.removeItem("token");
  //       window.location.href = "/login";
  //     }
  //   }
  //   return Promise.reject(error);
  // }
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    
    const errorMessage = error.response?.data?.message || "An error occurred";
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;