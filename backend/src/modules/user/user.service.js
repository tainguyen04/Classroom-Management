import { db } from "../../config/firebase.js";
import { generateSetupToken } from "../../utils/verifyToken.js";
import { sendSetupEmail } from "../../utils/sendSetupEmail.js";
export async function addStudent(student) {
  const studentSnap = await db
    .collection("users")
    .doc(student.phoneNumber)
    .get();
  if (studentSnap.exists) {
    throw new Error("Student already exists");
  }
  const emailSnap = await db
    .collection("users")
    .where("email", "==", student.email)
    .get();
  if (!emailSnap.empty) {
    throw new Error("Student with this email already exists");
  }
  const studentData = {
    ...student,
    role: "student",
    accountSetup: false,
  };
  await db.collection("users").doc(student.phoneNumber).set(studentData);
  const setupToken = generateSetupToken();
  await db
    .collection("accountSetupTokens")
    .doc(setupToken)
    .set({
      phoneNumber: student.phoneNumber,
      expiration: Date.now() + 24 * 60 * 60 * 1000,
    });
  await sendSetupEmail(student.email, setupToken);
  return {
    data: { studentData },
    id: student.phoneNumber,
  };
}
export async function addInstructor(instructor) {
  const instructorSnap = await db
    .collection("users")
    .doc(instructor.phoneNumber)
    .get();
  if (instructorSnap.exists) {
    throw new Error("Instructor already exists");
  }
  await db
    .collection("users")
    .doc(instructor.phoneNumber)
    .set({ ...instructor, role: "instructor" }, { merge: true });
  return { data: instructor, id: instructor.phoneNumber };
}
export async function getStudent() {
  const studentSnap = await db
    .collection("users")
    .where("role", "==", "student")
    .get();
  const students = studentSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return { message: "Get student successfully", data: students };
}
export async function getInstructor() {
  const instructorSnap = await db
    .collection("users")
    .where("role", "==", "instructor")
    .get();
  const instructors = instructorSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return { message: "Get instructor successfully", data: instructors };
}
export async function getStudentByPhoneNumber(phoneNumber) {
  const studentSnap = await db.collection("users").doc(phoneNumber).get();
  if (!studentSnap.exists) {
    throw new Error("Student not found");
  }
  return { message: "Get student successfully", data: studentSnap.data() };
}
export async function editStudent(phoneNumber, updatedData) {
  const studentSnap = await db.collection("users").doc(phoneNumber).get();
  if (!studentSnap.exists) {
    throw new Error("Student not found");
  }
  const { role, ...updatedFields } = updatedData;
  await studentSnap.ref.update(updatedFields);
  return {
    message: "Edit student successfully",
    data: { ...studentSnap.data(), ...updatedFields },
  };
}
export async function deleteStudent(phoneNumber) {
  const studentSnap = await db.collection("users").doc(phoneNumber).get();
  if (!studentSnap.exists) {
    throw new Error("Student not found");
  }
  await studentSnap.ref.delete();
  return { message: "Delete student successfully" };
}
