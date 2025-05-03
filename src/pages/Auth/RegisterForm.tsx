import React, { FormEvent, useState } from "react";
import { RegisterFormProps } from "./authTypes";

const RegisterForm : React.FC <RegisterFormProps> = ({switchToLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [full_name, setFullName] = useState('');
    
    const handleRegister = (e: FormEvent) => {
        e.preventDefault();
        console.log('Registered user: ', email, full_name, password);
          // TODO: Call backend registration API here
    }

    return (
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            required
            onChange={e => setFullName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
          <p>
            Already have an account?{' '}
            <span onClick={switchToLogin}>
              Login
            </span>
          </p>
        </form>
      );
    };
    
export default RegisterForm;