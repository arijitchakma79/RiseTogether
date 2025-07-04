import { Role } from "../contexts/authTypes";

const adminEmails = import.meta.env.VITE_ADMINS?.split(',') || [];

const determineRoleFromEmail = (email: string): Role => {
  return adminEmails.includes(email.trim()) ? 'admin' : 'user';
};

export default determineRoleFromEmail;
