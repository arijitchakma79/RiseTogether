// src/context/authTypes.ts

export type Role = 'user' | 'admin'

export interface User {
    email: string;
    role: Role;
    fullName?: string;
}

export interface AuthContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
}
  