// src/pages/Auth/AuthLayout.tsx


import React from 'react';
import {AuthLayoutProps} from './authTypes';
import './auth.css';



const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
      <div className="auth-container">
        <div className="auth-box">
            <h2>🌱 Welcome to <span style={{ color: '#3b82f6' }}>RiseTogether</span></h2>
          {children}
        </div>
      </div>
    );
  };
  

export default AuthLayout;