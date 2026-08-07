import * as authService from "./auth.service.js";
export async function createAccessCode(req, res) {
  try {
    const { phoneNumber } = req.body;
    const result = await authService.createAccessCode(phoneNumber);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
export async function validateAccessCode(req, res) {
  try {
    const { phoneNumber, accessCode } = req.body;
    const result = await authService.validateAccessCode(
      phoneNumber,
      accessCode,
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
