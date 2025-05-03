import React, {useState} from 'react';
import AuthLayout from './AuthLayout';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

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
