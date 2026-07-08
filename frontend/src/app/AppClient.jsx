import axios from "axios";
import { DATABASE_ORIGIN } from "../services/Constants";

const apiClient = axios.create({
  baseURL: DATABASE_ORIGIN,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor automatically injects your JWT token into secure requests if present
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response, // Pass through successful responses smoothly
  (error) => {
    // If the server returns 401, it means the token has expired or is invalid
    if (error.response && error.response.status === 401) {
      console.warn("JWT Token expired or invalid. Automatic logout triggered.");

      // Clear the expired credentials from browser storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Clear Redux state or notify the user
      alert("Your session has expired. Please log in again.");

      // Force redirect the browser to your login page route
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
export default apiClient;
