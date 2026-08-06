import { db } from "../../config/firebase.js";
export async function addStudent(student) {
  await db
    .collection("users")
    .doc(student.phoneNumber)
    .set(student, { merge: true });
  return { id: student.phoneNumber };
}
