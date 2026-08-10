import { Navigate, Outlet } from "react-router-dom";
import { storage } from "../utils/storage";

export const ProtectedRoute = ({ allowedRole }) => {
  const phone = storage.getPhone();
  const role = storage.getRole();
  if (!phone) {
    return <Navigate to="/login" replace />;
  }
  console.log("ProtectedRoute:");
  console.log("phone:", phone);
  console.log("role:", role);
  console.log("allowedRole:", allowedRole);
  if (allowedRole && role !== allowedRole) {
    const defaultPath =
      role === "instructor" ? "/instructor/lessons" : "/student/lessons";
    return <Navigate to={defaultPath} replace />;
  }

  return <Outlet />;
};
