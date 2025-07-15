import React from 'react';
import '../../styles/landing/LadingPage.css';

const LandingPage: React.FC = () => {
  return (
    <section className="landing-container">
      <div className="landing-content">
        <h1 className="site-name">RiseTogether</h1>
        <p className="typewriter">
          Uplift Lives. Share Hope. Rise Together.
        </p>
      </div>
    </section>
  );
};

export default LandingPage;
