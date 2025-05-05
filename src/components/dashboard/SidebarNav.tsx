// src/components/dashboard/SidebarNav.tsx
import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const SidebarNav: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/auth'); 
  };


  return (
    <nav className="sidebar">
      <div className="nav-links">
        <Link to="/dashboard">🏠 Home</Link>
        <Link to="/dashboard/submit">📩 Submit a Request</Link>
        <Link to="/dashboard/my-requests">📁 My Requests</Link>
      </div>

      <div className="sidebar-footer">
        <div className="profile">
          <p>{user?.fullName || user?.email}</p>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default SidebarNav;