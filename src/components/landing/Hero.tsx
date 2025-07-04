import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      <h1>Making a Difference Together</h1>
      <p>Join us in supporting communities and creating positive change</p>
      <Link to="/auth" className="cta-button">Get Started</Link>
    </section>
  );
};

export default Hero; 