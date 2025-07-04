import React from 'react';
import { Navbar, Hero, About, Team, Contact, Footer } from '../components/landing';

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