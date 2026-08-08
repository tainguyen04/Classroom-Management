import crypto from "crypto";
export function generateSetupToken() {
  return crypto.randomBytes(16).toString("hex");
}
