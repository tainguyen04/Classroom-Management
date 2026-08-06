import { Router } from "express";
import * as authController from "./auth.controller.js";

const router = Router();
router.post("/createAccessCode", authController.createAccessCode);
export default router;
