import React from 'react';
import '../../styles/landing/TeamPage.css';
import ariji from '../../assets/images/teams/ariji.jpeg';
import saprativ from '../../assets/images/teams/saprativ.jpg';
import tsc from '../../assets/images/teams/tsc.png';
import prodeep from '../../assets/images/teams/prodeep.jpg';

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
    name: 'Prodeep Arjya Kheesa',
    title: 'Co-Founder and Operations Lead',
    image: prodeep,
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
    email: 'tusher.csecu@gmail.com'
  },
  {
    name: 'Ariji Chakkma',
    title: 'Technical Advisor',
    image: ariji,
    bio: 'I am a Junior Computer Science student at Drexel.',
    linkedin: 'https://www.linkedin.com/in/arijitchakma/',
    email: 'arijitchakma79@gmail.com'
  }
];

const TeamPage: React.FC = () => {
  return (
    <div className="team-wrapper">
      <section className="team-hero">
        <h1 className="team-title">Meet Our Team</h1>
        <p className="team-subtitle">A passionate group dedicated to uplifting lives and building a brighter future together.</p>
        <div className="team-divider" />
      </section>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <img src={member.image} alt={member.name} className="team-photo" />
            <h2>{member.name}</h2>
            <p className="team-role">{member.title}</p>
            <p className="team-bio">{member.bio}</p>
            <div className="team-links">
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="icon-btn linkedin-btn">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm15.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.57 1.98 3.57 4.56v5.62z" fill="#0077b5"/></svg>
              </a>
              <a href={`mailto:${member.email}`} aria-label="Email" className="icon-btn email-btn">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 13.065l-8-6.065v12h16v-12l-8 6.065zm8-8.065h-16c-1.104 0-2 .896-2 2v.217l10 7.583 10-7.583v-.217c0-1.104-.896-2-2-2z" fill="#ff4d4d"/></svg>
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="team-quote-section">
        <blockquote className="team-quote">"Alone we can do so little; together we can do so much."</blockquote>
        <div className="team-mission">We believe in the power of teamwork to create lasting change in the Chittagong Hill Tracts and beyond.</div>
      </div>
      <footer className="landing-footer">
        &copy; {new Date().getFullYear()} RiseTogether. All rights reserved. &trade;
      </footer>
    </div>
  );
};

export default TeamPage;
