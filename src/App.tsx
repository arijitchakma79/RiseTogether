//src/App.tsx

import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
  return (
    <Router>
      <LandingNavbar />
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
    </Router>
  );
};

export default App;