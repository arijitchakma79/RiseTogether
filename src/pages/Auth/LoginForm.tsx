import React, { useState } from "react";
import { useAuth } from '../../contexts/AuthContext';
import { LoginFormProps } from "./authTypes";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm: React.FC<LoginFormProps> = ({ switchToRegister }) => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    const result = await login(email, password);
    if (!result.success) {
      setError(result.error || 'Login failed');
    } else {
      setError(null);
    }
  };

  return (
    <div className="auth-form">
      <h3>Login</h3>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="smaller-input"
      />

      <div className="password-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="smaller-input"
        />
        <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>

      {error && <p className="error">{error}</p>}
      <p>
        Don't have an account?{' '}
        <button onClick={switchToRegister} className="link-button">
          Register
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
