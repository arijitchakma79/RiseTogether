import React from 'react';
import '../../styles/landing/TeamPage.css';
import ariji from '../../assets/images/teams/ariji.jpeg';
import saprativ from '../../assets/images/teams/saprativ.jpg';
import tsc from '../../assets/images/teams/tsc.png';


const teamMembers = [
  {
    name: 'Saprativ Chakma',
    title: 'Co-Founder and Director',
    image: saprativ,
    bio: 'Current high school student, passionate about technology and social impact.',
    linkedin: 'https://www.linkedin.com/in/saprativchakma/',
    email: 'saprativchakma9@gmail.com'
  },
  {
    name: 'Prodeep Chakma',
    title: 'Co-Founder and Operations Lead',
    image: '/src/assets/images/prodeep.jpg',
    bio: "Current high school student at Lakers' School and College.",
    linkedin: 'https://www.linkedin.com/in/janedoe',
    email: 'jane@example.com'
  },
  {
    name: 'Tusher Shubhro Chakma',
    title: 'Full Stack Developer & Tech Lead',
    image: tsc,
    bio: 'I am a senior Computer Science student at Chittagong University of Engineering and Technology.',
    linkedin: 'https://www.linkedin.com/in/tusher-shubhro-226677264/',
    email: 'john@example.com'
  },
  {
    name: 'Ariji Chakkma',
    title: 'Technical Advisor',
    image: ariji,
    bio: 'I am a pre-junior Computer Science student at Drexel.',
    linkedin: 'https://www.linkedin.com/in/arijitchakma/',
    email: 'arijitchakma79@gmail.com'
  }
];

const TeamPage: React.FC = () => {
  return (
    <div className="team-wrapper">
      <h1 className="team-title">Meet Our Team</h1>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <img src={member.image} alt={member.name} className="team-photo" />
            <h2>{member.name}</h2>
            <p className="team-role">{member.title}</p>
            <p className="team-bio">{member.bio}</p>
            <div className="team-links">
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={`mailto:${member.email}`}>Email</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
