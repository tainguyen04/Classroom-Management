import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./pages/Login";
import { SetupAccount } from "./pages/SetupAccount";
import { StudentLayout } from "./layouts/StudentLayout";
import { InstructorLayout } from "./layouts/InstructorLayout";
import { StudentLessons } from "./pages/student/Lessons";
import { StudentProfile } from "./pages/student/Profile";

import { InstructorStudents } from "./pages/instructor/Students";
import { InstructorLessons } from "./pages/instructor/Lessons";
import { ChatBox } from "./components/ChatBox";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/setup-account" element={<SetupAccount />} />

        <Route element={<ProtectedRoute allowedRole="student" />}>
          <Route element={<StudentLayout />}>
            <Route path="/student/lessons" element={<StudentLessons />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/chat" element={<ChatBox />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRole="instructor" />}>
          <Route element={<InstructorLayout />}>
            <Route
              path="/instructor/students"
              element={<InstructorStudents />}
            />
            <Route path="/instructor/lessons" element={<InstructorLessons />} />
            <Route path="/chat" element={<ChatBox />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
