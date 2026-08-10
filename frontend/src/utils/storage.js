const PHONE_NUMBER = "phoneNumber";
const ROLE = "role";
const EMAIL = "email";
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
  setEmail: (email) => {
    localStorage.setItem(EMAIL, email);
  },
  getEmail: () => {
    return localStorage.getItem(EMAIL);
  },
  clearAuth: () => {
    localStorage.removeItem(ROLE);
    localStorage.removeItem(PHONE_NUMBER);
    localStorage.removeItem(EMAIL);
  },
};
