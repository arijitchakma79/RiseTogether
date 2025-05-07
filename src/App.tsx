//src/App.tsx

import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {AuthPage, AdminPanel} from './pages';
import {  AdminRoute } from './routes';
import DashboardLayout from './layout/DashboardLayout';
import DashboardRoutes from './routes/DashboardRoutes';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />

        <Route path="/dashboard/*" element={<DashboardLayout />}>
            {DashboardRoutes.props.children}
        </Route>

        <Route path="/admin" element={
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        } />

        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
};

export default App;
