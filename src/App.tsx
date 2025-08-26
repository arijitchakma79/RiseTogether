//src/App.tsx

import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import {
  AuthPage,
  AdminPanel,
  LandingPage,
  AboutPage,
  TeamPage,
  ContactPage
} from './pages';
import { AdminRoute } from './routes';
import DashboardLayout from './layout/DashboardLayout';
import DashboardRoutes from './routes/DashboardRoutes';
import './styles/App.css';
import { LandingNavbar } from './components';

const App: React.FC = () => {
  const location = useLocation();
  // Define routes where LandingNavbar should be shown
  const showLandingNavbar = [
    '/',
    '/about',
    '/team',
    '/contact',
    '/auth',
  ].includes(location.pathname);

  return (
    <div className="app-wrapper">
      {showLandingNavbar && <LandingNavbar />}
      <div className="page-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard/*" element={<DashboardLayout />}>
            {DashboardRoutes.props.children}
          </Route>
          <Route path="/admin" element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};
export default App;