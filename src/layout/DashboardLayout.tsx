import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarNav } from '../components';
import '../styles/dashboard/Dashboard.css';

const DashboardLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="dashboard">
      {/* === Mobile Navbar === */}
      <div className="mobile-navbar">
        <button className="hamburger" onClick={toggleMobileMenu} aria-label="Toggle Menu">
          ☰
        </button>
        <h1 className="mobile-title">RiseTogether</h1>
      </div>

      {/* === Sidebar Navigation === */}
      <SidebarNav isMobileMenuOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

      {/* === Mobile Overlay === */}
      {isMobileMenuOpen && <div className="overlay show" onClick={closeMobileMenu}></div>}

      {/* === Main Content Area === */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
