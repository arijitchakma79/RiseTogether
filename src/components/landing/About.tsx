import React from 'react';
import './styles/About.css';

const About: React.FC = () => {
  const stats = [
    { number: '1000+', label: 'Donations Made' },
    { number: '500+', label: 'Communities Helped' },
    { number: '50+', label: 'Active Volunteers' }
  ];

  return (
    <section id="about" className="about-section">
      <h2>About Us</h2>
      <div className="about-content">
        <div className="about-text">
          <p>RiseTogether is a community-driven platform connecting donors with those in need. Our mission is to create a world where help is just a click away.</p>
        </div>
        <div className="about-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <h3>{stat.number}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About; 