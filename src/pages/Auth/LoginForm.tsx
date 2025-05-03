import React, {useState, FormEvent} from "react";
import { LoginFormProps } from "./authTypes";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

const LoginForm : React.FC<LoginFormProps> = ({switchToRegister}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();

        // Mock validation/authentication (replace with API call later)
        const isAdmin = email === 'admin@example.com';

        // Call context login()
        login({
            email,
            role: isAdmin? 'admin' : 'user',
            fullName: 'Mock User'
        });
        navigate(isAdmin ? '/admin' : '/dashboard');
    };

    return (
        <form onSubmit={handleLogin}>
            <input 
                type="email" 
                placeholder="Email" 
                onChange={e => setEmail(e.target.value)} 
            />
            <input 
                type='password' 
                placeholder="Password" 
                onChange={e => setPassword(e.target.value)} 
            />
           
            <button type="submit">
                Login
            </button>
            <p>Don't have an account? <span onClick={switchToRegister}>Register</span></p>
        </form>
    )
}

export default LoginForm;