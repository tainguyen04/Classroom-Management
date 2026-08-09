import { axiosClient } from "./axiosClient";
const socketApi = {
  ChatHistory: (params) => axiosClient.get("/chat/chat-history", { params }),
};
export default socketApi;
