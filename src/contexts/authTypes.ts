// src/context/authTypes.ts

export type Role = 'user' | 'admin';

export interface User {
  email: string;
  uid: string;
  role: Role;
  fullName?: string;
  displayName?: string;
  phoneNumber?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, fullName: string, role?: Role) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
