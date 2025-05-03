import { ReactNode } from 'react';

export interface AuthLayoutProps {
  children: ReactNode;
}

export interface LoginFormProps {
  switchToRegister: () => void;
}

export interface RegisterFormProps {
  switchToLogin: () => void;
}
