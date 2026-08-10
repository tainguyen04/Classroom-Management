import { Navigate, Outlet } from "react-router-dom";
import { storage } from "../utils/storage";

export const ProtectedRoute = ({ allowedRole }) => {
  const role = storage.getRole();
  if (!role) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRole && role !== allowedRole) {
    const defaultPath =
      role === "instructor" ? "/instructor/lessons" : "/student/lessons";
    return <Navigate to={defaultPath} replace />;
  }

  return <Outlet />;
};
