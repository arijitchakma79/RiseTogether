import React from 'react';
import { Contact } from '../components/landing';
import { Navbar, Footer } from '../components/landing';

const ContactPage: React.FC = () => {
  return (
    <div className="page-container">
      <Navbar />
      <div className="page-content">
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage; 