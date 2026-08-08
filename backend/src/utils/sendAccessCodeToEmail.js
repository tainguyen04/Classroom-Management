import { Resend } from "resend";
export async function sendAccessCodeToEmail(email, accessCode) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const resend = new Resend(resendApiKey);
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your Access Code",
      html: `<p>Your access code is: <strong>${accessCode}</strong></p>`,
    });
  } catch (err) {
    console.error("Error sending access code to email:", err);
  }
}
