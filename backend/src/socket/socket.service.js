import { db } from "../config/firebase.js";
import { getChatRoom } from "../utils/getChatRoom.js";
export async function getChatHistory(sender, receiver) {
  const room = getChatRoom(sender, receiver);
  const messagesSnap = await db
    .collection("messages")
    .where("room", "==", room)
    .get();
  const messages = messagesSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return { data: messages };
}

export function setupChatSocket(io) {
  io.on("connection", (socket) => {
    console.log("User connected");
    socket.on("join_chat", ({ sender, receiver }) => {
      const room = getChatRoom(sender, receiver);
      socket.join(room);
      console.log(`User joined chat room: ${room}`);
    });

    socket.on("send_message", ({ sender, receiver, message }) => {
      const room = getChatRoom(sender, receiver);
      const messageData = {
        sender,
        receiver,
        message,
        createdAt: Date.now(),
      };
      await db.collection("messages").add({room, ...messageData});
      io.to(room).emit("receive_message", messageData);

      console.log(`Message sent in chat room: ${room}`);
    });
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}
