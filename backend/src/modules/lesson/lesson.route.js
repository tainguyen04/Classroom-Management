import { Router } from "express";
import * as lessonController from "./lesson.controller.js";

const router = Router();

router.post("/assignLessons", lessonController.assignLessons);
router.get("/myLessons", lessonController.myLessons);
router.post("/markLessonDone", lessonController.markLessonDone);

export default router;
