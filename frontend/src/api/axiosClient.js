import axios from "axios";
import queryString from "query-string";
export const axiosClient = axios.create({
  baseURL: "https://classroom-management-bg6r.onrender.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
