import { Router } from "express";
import * as authController from "./auth.controller.js";

const router = Router({ caseSensitive: true });
router.post("/createAccessCode", authController.createAccessCode);
router.post("/validateAccessCode", authController.validateAccessCode);
router.post("/LoginEmail", authController.loginEmail);
router.post("/ValidateAccessCode", authController.validateAccessCodeEmail);
router.post("/setupAccount", authController.setupAccount);
export default router;
