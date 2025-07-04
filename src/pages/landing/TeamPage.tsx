import React from 'react';
import { Team, Navbar, Footer } from '../../components';

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