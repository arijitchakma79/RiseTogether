import React from 'react';
import '../../styles/landing/ContactPage.css';

const ContactPage: React.FC = () => {
  return (
    <div className="contact-wrapper">
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Reach out for any inquiries, suggestions, or to get involved.</p>
      </section>
      <div className="contact-content">
        <div className="contact-info-card">
          <h2>Our Info</h2>
          <p><strong>Email:</strong> <a href="mailto:risetogethercht@gmail.com">risetogethercht@gmail.com</a></p>
          <p><strong>Phone:</strong> <a href="tel:+8801556534772">+8801556534772</a></p>
          <p><strong>Address:</strong> Chittagong Hill Tracts, Bangladesh</p>
        </div>
      </div>
      <footer className="landing-footer">
        &copy; {new Date().getFullYear()} RiseTogether. All rights reserved. &trade;
      </footer>
    </div>
  );
};

export default ContactPage;