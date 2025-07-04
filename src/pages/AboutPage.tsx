import React from 'react';
import { About } from '../components/landing';
import { Navbar, Footer } from '../components/landing';

const AboutPage: React.FC = () => {
  return (
    <div className="page-container">
      <Navbar />
      <div className="page-content">
        <About />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage; 