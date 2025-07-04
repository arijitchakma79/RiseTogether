import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/landing/Navbar.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="landing-nav">
      <div className="nav-logo">
        <Link to="/">🌱 RiseTogether</Link>
      </div>
      <button className="hamburger-menu" onClick={toggleMenu} aria-label="Toggle navigation menu">
        <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
      </button>
      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <div className="nav-items">
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link>
          <Link to="/team" onClick={() => setIsMenuOpen(false)}>Our Team</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          <Link to="/auth" className="donate-button-mobile" onClick={() => setIsMenuOpen(false)}>Donate Now</Link>
        </div>
      </div>
      <Link to="/auth" className="donate-button-desktop">Donate Now</Link>
    </nav>
  );
};

export default Navbar; 