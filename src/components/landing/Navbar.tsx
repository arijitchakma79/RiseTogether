import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="landing-nav">
      <div className="nav-logo">
        <Link to="/">🌱 RiseTogether</Link>
      </div>
      <div className="nav-links">
        <div className="nav-items">
          <Link to="/about">About Us</Link>
          <Link to="/team">Our Team</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
      <Link to="/auth" className="donate-button">Donate Now</Link>
    </nav>
  );
};

export default Navbar; 