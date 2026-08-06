import { Router } from "express";
import * as userController from "./user.controller.js";

const router = Router();

router.post("/addStudent", userController.addStudent);

export default router;
