// src/pages/Auth/AuthPage.tsx

import React, { useState } from 'react';
import AuthLayout from './AuthLayout';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';


const ADMINS = ["arijitchakma79@gmail.com","saprativchakma99@gmail.com"];
const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    const isAdmin = user?.email && ADMINS.includes(user.email);
    console.log(isAdmin);
    return <Navigate to={isAdmin ? '/admin' : '/dashboard'} />;
  }

  return (
    <AuthLayout>
      {isLogin ? (
        <LoginForm switchToRegister={() => setIsLogin(false)} />
      ) : (
        <RegisterForm switchToLogin={() => setIsLogin(true)} />
      )}
    </AuthLayout>
  );
};

export default AuthPage;
