import { Role } from "../contexts/authTypes";

const adminEmails = import.meta.env.ADMINS?.split(',') || [];

const determineRoleFromEmail = (email: string): Role => {
  return adminEmails.includes(email) ? 'admin' : 'user';
};

export default determineRoleFromEmail;
