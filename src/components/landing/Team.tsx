import React from 'react';
import '../../styles/landing/Team.css';

const Team: React.FC = () => {
  const teamMembers = [
    { name: 'Prodip Chakma', position: 'Co-Founder' },
    { name: 'Saprativ Chakma', position: 'Co-Founder' },
    { name: 'Ariji Chakma', position: 'Technical Advisor' },
    { name: 'Tusher Subro Chakma', position: 'Technical Coordinator / Web Developer' }
  ];

  return (
    <section id="team" className="team-section">
      <h2>Our Team</h2>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <div className="member-photo"></div>
            <h3>{member.name}</h3>
            <p>{member.position}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team; 