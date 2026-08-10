import { db } from "../../config/firebase.js";
export async function assignLessons(studentPhones, title, description) {
  for (const studentPhone of studentPhones) {
    const data = {
      studentPhone,
      title,
      description,
      completed: false,
    };
    await db.collection("lessons").add(data);
  }
  return { message: "Lesson assigned successfully" };
}
export async function myLessons(phone) {
  const lessonsSnap = await db
    .collection("lessons")
    .where("studentPhone", "==", phone)
    .get();
  const lessons = lessonsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return { message: "Get lessons successfully", data: lessons };
}
export async function getAllLessons() {
  const lessonsSnap = await db.collection("lessons").get();
  const lessons = lessonsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return { message: "Get all lessons successfully", data: lessons };
}
export async function markLessonDone(phone, lessonId) {
  const lessonSnap = await db.collection("lessons").doc(lessonId).get();
  if (!lessonSnap.exists) {
    throw new Error("Lesson not found");
  }
  await lessonSnap.ref.update({ completed: true });
  return { message: "Lesson marked as completed successfully" };
}
