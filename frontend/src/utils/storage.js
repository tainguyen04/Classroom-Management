const ROLE = "role";
export const storage = {
  setRole: (role) => {
    sessionStorage.setItem(ROLE, role);
  },
  getRole: () => {
    return sessionStorage.getItem(ROLE);
  },
  removeRole: () => {
    sessionStorage.removeItem(ROLE);
  },
};
