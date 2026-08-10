import { Router } from "express";
import * as userController from "./user.controller.js";

const router = Router();

router.post("/addStudent", userController.addStudent);
router.post("/addInstructor", userController.addInstructor);
router.get("/instructors", userController.getInstructor);
router.get("/students", userController.getStudent);
router.get("/student/:phone", userController.getStudentByPhoneNumber);
router.get("/student/:email", userController.getStudentByEmail);
router.put("/editStudent/:phone", userController.editStudent);
router.put("/editProfile", userController.editStudent);
router.delete("/student/:phone", userController.deleteStudent);
export default router;
