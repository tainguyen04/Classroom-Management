import { axiosClient } from "./axiosClient";

const userApi = {
  addStudent: (data) => axiosClient.post("/user/addStudent", data),
  addInstructor: (data) => axiosClient.post("/user/addInstructor", data),
  getStudent: () => axiosClient.get("/user/students"),
  getInstructor: () => axiosClient.get("/user/instructors"),
  getStudentByPhoneNumber: (phone) => axiosClient.get(`/user/student/${phone}`),
  getStudentByEmail: (email) => axiosClient.get(`/user/student/${email}`),
  editStudent: (phone, data) =>
    axiosClient.put(`/user/editStudent/${phone}`, data),
  editProfile: (data) => axiosClient.put("/user/editProfile", data),
  deleteStudent: (phone) => axiosClient.delete(`/user/student/${phone}`),
};

export default userApi;
