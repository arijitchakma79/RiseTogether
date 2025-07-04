import React from 'react';
import { Team } from '../components/landing';
import { Navbar, Footer } from '../components/landing';

const TeamPage: React.FC = () => {
  return (
    <div className="page-container">
      <Navbar />
      <div className="page-content">
        <Team />
      </div>
      <Footer />
    </div>
  );
};

export default TeamPage; 