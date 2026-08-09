import { Navigate, Outlet } from "react-router-dom";
import { storage } from "../utils/storage";

export const ProtectedRoute = ({ allowedRole }) => {
  const phone = storage.getPhone();
  const role = storage.getRole();
  if (!phone) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRole && role !== allowedRole) {
    const defaultPath =
      role === "instructor" ? "/instructor/students" : "/student/lessons";
    return <Navigate to={defaultPath} replace />;
  }

  return <Outlet />;
};
