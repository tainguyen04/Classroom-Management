import { db } from "../../config/firebase.js";
export async function addStudent(student) {
  const studentRef = await db
    .collection("users")
    .doc(student.phoneNumber)
    .get();
  if (studentRef.exists) {
    throw new Error("Student already exists");
  }
  await db
    .collection("users")
    .doc(student.phoneNumber)
    .set({ ...student, role: "student" }, { merge: true });
  return { data: student, id: student.phoneNumber };
}
export async function addInstructor(instructor) {
  const instructorRef = await db
    .collection("users")
    .doc(instructor.phoneNumber)
    .get();
  if (instructorRef.exists) {
    throw new Error("Instructor already exists");
  }
  await db
    .collection("users")
    .doc(instructor.phoneNumber)
    .set({ ...instructor, role: "instructor" }, { merge: true });
  return { data: instructor, id: instructor.phoneNumber };
}
export async function getStudent() {
  const studentsRef = await db
    .collection("users")
    .where("role", "==", "student")
    .get();
  const students = studentsRef.docs.map((doc) => doc.data());
  return { message: "Get student successfully", data: students };
}
export async function getStudentByPhoneNumber(phoneNumber) {
  const studentRef = await db.collection("users").doc(phoneNumber).get();
  if (!studentRef.exists) {
    throw new Error("Student not found");
  }
  return { message: "Get student successfully", data: studentRef.data() };
}
export async function editStudent(phoneNumber, updatedData) {
  const studentRef = await db.collection("users").doc(phoneNumber).get();
  if (!studentRef.exists) {
    throw new Error("Student not found");
  }
  await studentRef.ref.update(updatedData);
  return {
    message: "Edit student successfully",
    data: { ...studentRef.data(), ...updatedData },
  };
}
export async function deleteStudent(phoneNumber) {
  const studentRef = await db.collection("users").doc(phoneNumber).get();
  if (!studentRef.exists) {
    throw new Error("Student not found");
  }
  await studentRef.ref.delete();
  return { message: "Delete student successfully" };
}
