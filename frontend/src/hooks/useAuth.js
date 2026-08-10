import { useState } from "react";
import { message } from "antd";
import { storage } from "../utils/storage";
export const useAuth = () => {
  const [role, setRole] = useState(() => storage.getRole() || null);
  const loginWithRole = (newRole) => {
    storage.setRole(newRole);
    setRole(newRole);
    message.success(`Đăng nhập thành công với vai trò ${newRole}`);
  };
  const logout = () => {
    storage.clearAuth();
    setRole(null);
    message.info("Đã đăng xuất");
  };
  return { role, loginWithRole, logout };
};
