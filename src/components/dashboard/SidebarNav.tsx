// src/components/dashboard/SidebarNav.tsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/dashboard/SidebarNav.css';

const SidebarNav: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-inner">
        <div className="sidebar-header">
          <p>Hi, {user?.fullName || user?.email}</p>
        </div>
        <div className="nav-links">
          <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>🏠 Home</Link>
          <Link to="/dashboard/submit" className={location.pathname === '/dashboard/submit' ? 'active' : ''}>📩 Submit a Donation</Link>
          <Link to="/dashboard/my-requests" className={location.pathname === '/dashboard/my-requests' ? 'active' : ''}>📁 My Requests</Link>
          <Link to="/dashboard/settings" className={location.pathname === '/dashboard/settings' ? 'active' : ''}>⚙️ Settings</Link>
        </div>
      </div>

      <div className="sidebar-footer">
        <button onClick={handleLogout}>🚪 Logout</button>
      </div>
    </nav>
  );
};

export default SidebarNav;