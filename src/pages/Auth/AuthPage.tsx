import React, {useState} from 'react';
import AuthLayout from './AuthLayout';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) return <Navigate to ="/dashboard" />;

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
