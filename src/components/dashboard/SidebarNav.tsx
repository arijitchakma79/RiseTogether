import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/dashboard/SidebarNav.css';

type SidebarNavProps = {
  isMobileMenuOpen?: boolean;
  onClose?: () => void;
};

const SidebarNav: React.FC<SidebarNavProps> = ({ isMobileMenuOpen = false, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    if (onClose) onClose();
    navigate('/auth');
  };

  return (
    <nav className={`sidebar ${isMobileMenuOpen ? 'show-mobile' : ''}`}>
      {/* Mobile Close Button */}
      {onClose && (
        <div className="sidebar-close-wrapper">
          <button className="close-btn" onClick={onClose} aria-label="Close sidebar">
            ×
          </button>
        </div>
      )}

      <div className="sidebar-inner">
        {/* Header */}
        <div className="sidebar-header">
          <div className="avatar-circle">{user?.fullName?.charAt(0).toUpperCase() || 'U'}</div>
          <strong>{user?.fullName}</strong>
          <p className="user-email">{user?.email}</p>
        </div>

        {/* Navigation */}
        <div className="nav-links">
          <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''} onClick={onClose}>🏠 Home</Link>
          <Link to="/dashboard/submit" className={location.pathname === '/dashboard/submit' ? 'active' : ''} onClick={onClose}>📩 Submit</Link>
          <Link to="/dashboard/my-requests" className={location.pathname === '/dashboard/my-requests' ? 'active' : ''} onClick={onClose}>📁 My Requests</Link>
          <Link to="/dashboard/settings" className={location.pathname === '/dashboard/settings' ? 'active' : ''} onClick={onClose}>⚙️ Settings</Link>
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          <button onClick={handleLogout}>🚪 Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default SidebarNav;
