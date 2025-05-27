import { API_BASE_URL } from "@/config";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add auth token to every request automatically
// axiosClient.interceptors.request.use(
//   async config => {
//     const token = await AsyncStorage.getItem('userToken'); // or SecureStore
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => Promise.reject(error)
// );

// // Optional: handle response errors globally
// axiosClient.interceptors.response.use(
//   response => response,
//   error => {
//     // Handle 401 logout or token refresh here if needed
//     return Promise.reject(error);
//   }
// );

export default axiosClient;
