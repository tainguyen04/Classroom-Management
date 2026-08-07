import { db } from "../../config/firebase.js";
import { generateAccessCode } from "../../utils/generateAccessCode.js";
import { sendAccessCode } from "../../utils/sendAccessCode.js";

export async function createAccessCode(phoneNumber) {
  const userRef = await db.collection("users").doc(phoneNumber).get();

  if (!userRef.exists) {
    throw new Error("User not found");
  }
  const accessCodeRef = await db
    .collection("accessCodes")
    .doc(phoneNumber)
    .get();
  if (accessCodeRef.exists) {
    throw new Error("Access code already exists for this phone number");
  }
  const accessCode = generateAccessCode();
  await db.collection("accessCodes").doc(phoneNumber).set({
    accessCode,
  });
  // let phoneNumberFormatted = phoneNumber;
  // if (phoneNumberFormatted.startsWith("0")) {
  //   phoneNumberFormatted = "+84" + phoneNumberFormatted.slice(1);
  // }
  await sendAccessCode(phoneNumber, accessCode);
  return { message: "Access code sent successfully" };
}
export async function validateAccessCode(phoneNumber, accessCode) {
  const accessCodeRef = await db
    .collection("accessCodes")
    .doc(phoneNumber)
    .get();

  if (!accessCodeRef.exists) {
    throw new Error("Access code not found");
  }
  const storedAccessCode = accessCodeRef.data().accessCode;
  if (storedAccessCode !== accessCode) {
    throw new Error("Invalid access code");
  }
  await accessCodeRef.ref.delete();
  const userRef = await db.collection("users").doc(phoneNumber).get();
  if (!userRef.exists) {
    throw new Error("User not found");
  }
  return {
    message: "Access code validated successfully",
    role: userRef.data().role,
  };
}
