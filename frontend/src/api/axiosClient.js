import axios from "axios";
import queryString from "query-string";
export const axiosClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://classroom-management-bg6r.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.response.use((response) => response.data);
