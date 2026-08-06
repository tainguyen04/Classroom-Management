import { db } from "../../config/firebase.js";
import { generateAccessCode } from "../../utils/generateAccessCode.js";

export async function createAccessCode(phoneNumber) {
  const userRef = await db.collection("users").doc(phoneNumber).get();

  if (!userRef.exists) {
    throw new Error("User not found");
  }
  let phoneFormatted = phoneNumber;
  if (phoneFormatted.startsWith("0")) {
    phoneFormatted = "+84" + phoneFormatted.slice(1);
  }
  const accessCode = generateAccessCode();
  await db.collection("accessCodes").doc(phoneNumber).set({
    accessCode,
  });
  return { message: "Access code sent successfully" };
}
export async function validateAccessCode(phoneNumber, accessCode) {}
