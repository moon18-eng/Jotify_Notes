import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

// Automatically attach Authorization header to every request if token exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;