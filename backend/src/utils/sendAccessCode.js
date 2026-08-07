// import twilio from "twilio";
export async function sendAccessCode(phoneNumber, accessCode) {
  console.log(`Sending access code ${accessCode} to ${phoneNumber}`);
  // const accountSid = process.env.TWILIO_ACCOUNT_SID;
  // const authToken = process.env.TWILIO_AUTH_TOKEN;
  // const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
  // const client = twilio(accountSid, authToken);
  // try {
  //   await client.messages.create({
  //     body: `Your access code is: ${accessCode}`,
  //     from: twilioPhoneNumber,
  //     to: phoneNumber,
  //   });
  // } catch (err) {
  //   console.error("Error sending access code:", err);
  // }
}
