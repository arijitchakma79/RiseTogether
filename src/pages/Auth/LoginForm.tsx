import React, {useState, FormEvent} from "react";
import { LoginFormProps } from "./authTypes";

const LoginForm : React.FC<LoginFormProps> = ({switchToRegister}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        console.log('Login with ', email, password);
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