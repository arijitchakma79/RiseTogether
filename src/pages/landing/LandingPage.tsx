import React from 'react';
import '../../styles/landing/LadingPage.css';

const LandingPage: React.FC = () => {
  return (
    <>
      <section className="landing-container">
        <div className="landing-content">
          <h1 className="site-name">RiseTogether</h1>
          <p className="landing-subtitle">Empowering the Chittagong Hill Tracts, one act of kindness at a time.</p>
          <p className="typewriter">
            Uplift Lives. Share Hope. Rise Together.
          </p>
          <a href="/about" className="landing-cta-btn">Learn More</a>
        </div>
      </section>
      <footer className="landing-footer">
        &copy; {new Date().getFullYear()} RiseTogether. All rights reserved. &trade;
      </footer>
    </>
  );
};

export default LandingPage;
