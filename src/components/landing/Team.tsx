import React from 'react';
import './styles/Team.css';

const Team: React.FC = () => {
  const teamMembers = [
    { name: 'Team Member 1', position: 'Founder & CEO' },
    { name: 'Team Member 2', position: 'Operations Director' },
    { name: 'Team Member 3', position: 'Community Manager' },
    { name: 'Team Member 4', position: 'Tech Lead' }
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