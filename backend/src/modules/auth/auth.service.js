import { db } from "../../config/firebase.js";
import { generateAccessCode } from "../../utils/generateAccessCode.js";
import { sendAccessCode } from "../../utils/sendAccessCode.js";
import { sendAccessCodeToEmail } from "../../utils/sendAccessCodeToEmail.js";
import bcrypt from "bcrypt";

export async function createAccessCode(phoneNumber) {
  const userSnap = await db.collection("users").doc(phoneNumber).get();

  if (!userSnap.exists) {
    throw new Error("User not found");
  }
  const accessCodeSnap = await db
    .collection("accessCodes")
    .doc(phoneNumber)
    .get();
  if (accessCodeSnap.exists) {
    throw new Error("Access code already exists for this phone number");
  }
  const accessCode = generateAccessCode();
  await db.collection("accessCodes").doc(phoneNumber).set({
    accessCode,
  });
  let phoneNumberFormatted = phoneNumber;
  if (phoneNumberFormatted.startsWith("0")) {
    phoneNumberFormatted = "+84" + phoneNumberFormatted.slice(1);
  }
  await sendAccessCode(phoneNumberFormatted, accessCode);
  return { message: "Access code sent successfully" };
}
export async function validateAccessCode(phoneNumber, accessCode) {
  const accessCodeSnap = await db
    .collection("accessCodes")
    .doc(phoneNumber)
    .get();

  if (!accessCodeSnap.exists) {
    throw new Error("Access code not found");
  }
  const storedAccessCode = accessCodeSnap.data().accessCode;
  if (storedAccessCode !== accessCode) {
    throw new Error("Invalid access code");
  }
  await accessCodeSnap.ref.delete();
  const userSnap = await db.collection("users").doc(phoneNumber).get();
  if (!userSnap.exists) {
    throw new Error("User not found");
  }
  return {
    message: "Access code validated successfully",
    role: userSnap.data().role,
  };
}

export async function loginEmail(email) {
  const userSnap = await db
    .collection("users")
    .where("email", "==", email)
    .get();
  if (userSnap.empty) {
    throw new Error("User not found");
  }
  const accessCode = generateAccessCode();
  await db.collection("accessCodes").doc(email).set({
    accessCode,
  });
  await sendAccessCodeToEmail(email, accessCode);
  return { message: "Access code generated successfully", accessCode };
}
export async function validateAccessCodeEmail(email, accessCode) {
  const accessCodeSnap = await db.collection("accessCodes").doc(email).get();
  if (!accessCodeSnap.exists) {
    throw new Error("Access code not found");
  }
  const storedAccessCode = accessCodeSnap.data().accessCode;
  if (storedAccessCode !== accessCode) {
    throw new Error("Invalid access code");
  }
  await accessCodeSnap.ref.update({ accessCode: "" });
  return { success: true };
}

export async function setupAccount(setupToken, username, password) {
  const tokenSnap = await db
    .collection("accountSetupTokens")
    .doc(setupToken)
    .get();

  if (!tokenSnap.exists) {
    throw new Error("Invalid setup token");
  }
  const tokenData = tokenSnap.data();
  if (tokenData.expiration < Date.now()) {
    throw new Error("Setup token has expired");
  }
  const userSnap = await db
    .collection("users")
    .doc(tokenData.phoneNumber)
    .get();
  if (!userSnap.exists) {
    throw new Error("User not found");
  }
  if (userSnap.data().accountSetup) {
    throw new Error("Account has already been set up");
  }
  const passwordHash = await bcrypt.hash(password, 10);

  await userSnap.ref.update({ username, passwordHash, accountSetup: true });
  await tokenSnap.ref.delete();
  return { message: "Account setup successfully" };
}
