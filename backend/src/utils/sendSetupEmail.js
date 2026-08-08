import { Resend } from "resend";
export async function sendSetupEmail(email, setupToken) {
  const frontendUrl = process.env.FRONTEND_URL;
  const setupUrl = `${frontendUrl}/setup-account?token=${setupToken}`;
  const resendApiKey = process.env.RESEND_API_KEY;
  const resend = new Resend(resendApiKey);
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Setup Your Account",
      html: `<p>Click the link below to set up your account:</p><p><a href="${setupUrl}" target="_blank">Set Up Account</a></p>`,
    });
  } catch (err) {
    console.error("Error sending setup email:", err);
  }
}
