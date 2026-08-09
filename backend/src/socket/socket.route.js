import { Router } from "express";
import * as socketController from "./socket.controller.js";

const router = Router();
router.get("/chat-history", socketController.getChatHistory);
export default router;
