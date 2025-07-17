// src/routes/AdminRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

type AdminRouteProps = {
  children: React.ReactElement;
};

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuthenticated, user, isLoading } = useAuth();


  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default AdminRoute;
