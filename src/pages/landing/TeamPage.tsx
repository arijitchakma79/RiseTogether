import React from 'react';
import '../../styles/landing/TeamPage.css';

const teamMembers = [
  {
    name: 'Ariji Banerjee',
    role: 'Founder & Visionary',
    image: '/images/team/ariji.jpg',
  },
  {
    name: 'Jane Doe',
    role: 'Operations Lead',
    image: '/images/team/jane.jpg',
  },
  {
    name: 'John Smith',
    role: 'Tech Director',
    image: '/images/team/john.jpg',
  },
  {
    name: 'Emily Davis',
    role: 'Community Outreach',
    image: '/images/team/emily.jpg',
  },
];

const TeamPage: React.FC = () => {
  return (
    <section className="team-container">
      <h1 className="team-title">Meet Our Team</h1>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card">
            <img src={member.image} alt={member.name} className="team-image" />
            <h3 className="team-name">{member.name}</h3>
            <p className="team-role">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamPage;
