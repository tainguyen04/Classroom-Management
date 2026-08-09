import { axiosClient } from "./axiosClient";

const userApi = {
  addStudent: (data) => axiosClient.post("/user/addStudent", data),
  addInstructor: (data) => axiosClient.post("/user/addInstructor", data),
  getStudent: () => axiosClient.get("/user/students"),
  getStudentByPhoneNumber: (phone) => axiosClient.get(`/user/student/${phone}`),
  editStudent: (phone, data) =>
    axiosClient.put(`/user/editStudent/${phone}`, data),
  deleteStudent: (phone) => axiosClient.delete(`/user/student/${phone}`),
};

export default userApi;
