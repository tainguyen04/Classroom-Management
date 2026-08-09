import { axiosClient } from "./axiosClient";

const authApi = {
  createAccessCode: (data) => axiosClient.post("/auth/createAccessCode", data),
  validateAccessCode: (data) =>
    axiosClient.post("/auth/validateAccessCode", data),
  loginEmail: (data) => axiosClient.post("/auth/LoginEmail", data),
  ValidateAccessCode: (data) =>
    axiosClient.post("/auth/ValidateAccessCode", data),
  setupAccount: (data) => axiosClient.post("/auth/setupAccount", data),
};

export default authApi;
