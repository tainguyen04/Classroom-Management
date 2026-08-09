const PHONE_NUMBER = "phoneNumber";
const ROLE = "role";
export const storage = {
  setPhone: (phoneNumber) => {
    localStorage.setItem(PHONE_NUMBER, phoneNumber);
  },
  getPhone: () => {
    return localStorage.getItem(PHONE_NUMBER);
  },
  setRole: (role) => {
    localStorage.setItem(ROLE, role);
  },
  getRole: () => {
    return localStorage.getItem(ROLE);
  },
  clearAuth: () => {
    localStorage.removeItem(ROLE);
    localStorage.removeItem(PHONE_NUMBER);
  },
};
