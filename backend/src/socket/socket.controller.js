import * as socketService from "./socket.service.js";
export async function getChatHistory(req, res) {
  try {
    const { sender, receiver } = req.query;
    const result = await socketService.getChatHistory(sender, receiver);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
