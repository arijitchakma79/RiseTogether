// src/pages/Auth/RegisterForm.tsx

import React, {useState} from "react";
import { useAuth } from "../../contexts/AuthContext";
import { RegisterFormProps } from "./authTypes";


const RegisterForm : React.FC<RegisterFormProps> = ({switchToLogin}) => {
  const { signup, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {
    const result = await signup(email,  password, fullName);
    if (!result.success) {
      setError(result.error || 'Signup failed.');
    } else {
      setError(null);
    }
    console.log('SignUp data', result);
  }

  return (
    <div className="auth-form">
      <h3>Register</h3>
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={e => setFullName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button onClick={handleSignup} disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </button>
      {error && <p className="error">{error}</p>}
      <p>
        Already have an account?{' '}
        <button onClick={switchToLogin} className="link-button">
          Login
        </button>
      </p>
    </div>
  );
}

export default RegisterForm;