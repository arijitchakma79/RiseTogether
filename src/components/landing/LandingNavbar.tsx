import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../../styles/landing/LandingNavbar.css';

const LandingNavbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <nav className="navbar">
      {isMenuOpen && (
        <div className="mobile-overlay show" onClick={closeMenu}></div>
      )}

      <div className="navbar-left">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          RiseTogether
        </Link>
      </div>

      <div
        className="hamburger"
        onClick={toggleMenu}
        aria-label="Toggle navigation"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && toggleMenu()}
      >
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      <ul className={`navbar-right ${isMenuOpen ? 'open' : ''}`}>
        <li className={location.pathname === '/about' ? 'active' : ''}>
          <Link to="/about" onClick={closeMenu}>About</Link>
        </li>
        <li className={location.pathname === '/team' ? 'active' : ''}>
          <Link to="/team" onClick={closeMenu}>Team</Link>
        </li>
        <li className={location.pathname === '/contact' ? 'active' : ''}>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>
        </li>
        <li>
          <Link to="/auth" className="donate-btn" onClick={closeMenu}>Donate</Link>
        </li>
      </ul>
    </nav>
  );
};

export default LandingNavbar;
