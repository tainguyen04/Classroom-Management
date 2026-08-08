import * as lessonService from "./lesson.service.js";
export async function assignLessons(req, res) {
  try {
    const { studentPhones, title, description } = req.body;
    const result = await lessonService.assignLessons(
      studentPhones,
      title,
      description,
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
export async function myLessons(req, res) {
  try {
    const { phone } = req.query;
    const result = await lessonService.myLessons(phone);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
export async function markLessonDone(req, res) {
  try {
    const { phone, lessonId } = req.body;
    const result = await lessonService.markLessonDone(phone, lessonId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
