import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="landing-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>RiseTogether</h3>
          <p>Making a difference in communities worldwide</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <a href="#about">About Us</a>
          <a href="#team">Our Team</a>
          <a href="#contact">Contact</a>
          <Link to="/auth">Donate</Link>
        </div>
        <div className="footer-section">
          <h3>Connect With Us</h3>
          <div className="social-links">
            <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} RiseTogether. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 