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
export async function loginEmail(req, res) {
  try {
    const { email } = req.body;
    const result = await authService.loginEmail(email);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
export async function validateAccessCodeEmail(req, res) {
  try {
    const { email, accessCode } = req.body;

    const result = await authService.validateAccessCodeEmail(email, accessCode);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
export async function setupAccount(req, res) {
  try {
    const { setupToken, username, password } = req.body;

    const result = await authService.setupAccount(
      setupToken,
      username,
      password,
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
