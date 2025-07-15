import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/landing/LandingNavbar.css';

const LandingNavbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">Hive</Link>
      </div>
      <ul className="navbar-right">
        <li className={location.pathname === '/about' ? 'active' : ''}>
          <Link to="/about">About</Link>
        </li>
        <li className={location.pathname === '/team' ? 'active' : ''}>
          <Link to="/team">Team</Link>
        </li>
        <li className={location.pathname === '/contact' ? 'active' : ''}>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/auth" className="donate-btn">Donate</Link>
        </li>
      </ul>
    </nav>
  );
};

export default LandingNavbar;
