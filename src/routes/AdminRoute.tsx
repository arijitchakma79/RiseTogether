// src/routes/AdminRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Load from environment
const ADMINS = (import.meta.env.ADMINS || '')
  .split(',')
  .map((email: string) => email.trim());

const AdminRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  const isAdmin = user?.email && ADMINS.includes(user.email);
  console.log(isAdmin);

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default AdminRoute;
