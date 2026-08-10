import { axiosClient } from "./axiosClient";

const lessonApi = {
  assignLessons: (data) => axiosClient.post("/lesson/assignLesson", data),
  myLessons: (params) => axiosClient.get("/lesson/myLessons", { params }),
  getAllLessons: () => axiosClient.get("/lesson/getAllLessons"),
  markLessonDone: (data) => axiosClient.post("/lesson/markLessonDone", data),
};

export default lessonApi;
