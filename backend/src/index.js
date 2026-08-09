import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import userRoutes from "./modules/user/user.route.js";
import authRoutes from "./modules/auth/auth.route.js";
import lessonRoutes from "./modules/lesson/lesson.route.js";
import { Server } from "socket.io";
import { setupChatSocket } from "./socket/socket.service.js";
import socketRoutes from "./socket/socket.route.js";

const app = express();
app.use(
  cors({
    origin: Process.env.FRONTEND_URL || "http://localhost:5173",
  }),
);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

setupChatSocket(io);

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/lesson", lessonRoutes);
app.use("/api/chat", socketRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
