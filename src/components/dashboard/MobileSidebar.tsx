import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/dashboard/Dashboard.css';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose(); // Close the sidebar after navigation
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
    onClose();
  };

  // Default profile image if user doesn't have one
  const defaultProfileImage = "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.fullName || 'User');

  return (
    <>
      {/* Overlay */}
      <div 
        className={`overlay ${isOpen ? 'show' : ''}`} 
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <nav className={`sidebar ${isOpen ? 'show-mobile' : ''}`}>
        {/* User Profile Section */}
        <div className="sidebar-profile">
          <img 
            src={defaultProfileImage} 
            alt="Profile" 
            className="profile-image"
          />
          <div className="profile-info">
            <h3 className="profile-name">{user?.fullName || 'User'}</h3>
            <p className="profile-email">{user?.email || ''}</p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="sidebar-content">
          <button 
            onClick={() => handleNavigation('/dashboard')}
            className="sidebar-item"
          >
            Home
          </button>
          <button 
            onClick={() => handleNavigation('/dashboard/my-requests')}
            className="sidebar-item"
          >
            My Requests
          </button>
          <button 
            onClick={() => handleNavigation('/dashboard/submit-donation')}
            className="sidebar-item"
          >
            Submit Donation
          </button>
          <button 
            onClick={() => handleNavigation('/dashboard/settings')}
            className="sidebar-item"
          >
            Settings
          </button>
        </div>

        {/* Logout Button */}
        <div className="sidebar-footer">
          <button 
            onClick={handleLogout}
            className="sidebar-item logout-button"
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
};

export default MobileSidebar; 