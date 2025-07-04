import React from 'react';
import { Navbar, Hero,  Footer } from '../../components';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default LandingPage; 