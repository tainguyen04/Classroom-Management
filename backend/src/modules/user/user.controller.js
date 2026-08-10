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
export async function addInstructor(req, res) {
  try {
    const result = await userService.addInstructor(req.body);
    res.status(201).json({
      message: "Instructor added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export async function getStudent(req, res) {
  try {
    const result = await userService.getStudent();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export async function getInstructor(req, res) {
  try {
    const result = await userService.getInstructor();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export async function getStudentByPhoneNumber(req, res) {
  try {
    const { phone } = req.params;
    const result = await userService.getStudentByPhoneNumber(phone);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export async function editStudent(req, res) {
  try {
    const { phone } = req.params;
    const updatedData = req.body;
    const result = await userService.editStudent(phone, updatedData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export async function deleteStudent(req, res) {
  try {
    const { phone } = req.params;
    const result = await userService.deleteStudent(phone);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
