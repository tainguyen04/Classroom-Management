import * as userService from "./user.service.js";

export async function addStudent(req, res) {
  try {
    const result = await userService.addStudent(req.body);
    res.status(201).json({
      message: "Student added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
