import React from 'react';
import { Contact, Navbar, Footer } from '../../components';

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