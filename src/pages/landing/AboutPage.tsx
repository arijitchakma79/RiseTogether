import React from 'react';
import { About, Navbar, Footer } from '../../components';

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