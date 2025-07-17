import React, { useEffect, useRef, useState } from 'react';
import '../../styles/landing/AboutPage.css';

const images = [
  {
    src: '/src/assets/images/about1.jpg',
    caption: 'Community Unity Festival',
  },
  {
    src: '/src/assets/images/about1.jpg',
    caption: 'Free Family Portrait Day',
  },
  {
    src: '/src/assets/images/about1.jpg',
    caption: 'Youth Empowerment Workshop',
  },
];

const AboutPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    slideInterval.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, []);

  return (
    <div className="about-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">About RiseTogether</h1>
          <p className="hero-subtitle">
            A Chittagong Hill Tracts based organization dedicated to uplifting lives and sharing hope.
          </p>
        </div>
        <div className="hero-image slideshow-container">
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].caption}
            className="slideshow-image"
          />
          <div className="slide-caption">{images[currentIndex].caption}</div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="mission-card">
          <div className="card-icon">🎯</div>
          <h3>Our Mission</h3>
          <p>
            To empower marginalized communities in the Chittagong Hill Tracts by bridging the gap between those in need and compassionate donors, facilitating the direct and dignified sharing of essentials such as clothing, food, and educational tools through a transparent, empathetic platform.
          </p>
        </div>
        <div className="vision-card">
          <div className="card-icon">✨</div>
          <h3>Our Vision</h3>
          <p>
          A future where every individual in the Chittagong Hill Tracts, regardless of circumstance, has equitable access to life’s essentials and the dignity of being seen, heard, and supported — building a world where communities rise by lifting each other.
          </p>
        </div>
      </section>

      {/* How We Help */}
      <section className="how-we-help">
        <h2 className="section-title">How We Make a Difference</h2>
        <div className="help-grid">
          <div className="help-item">
            <div className="help-icon">📢 </div>
            <h4>Fundraising</h4>
            <p>We organize fundraising campaigns to support essential causes — from immediate relief, donations to maintaining server costs. </p>
          </div>
          <div className="help-item">
            <div className="help-icon">🎓 </div>
            <h4>Educational Seminars & Skill-Building</h4>
            <p>We host community seminars and learning sessions to empower individuals (mostly women and children) with knowledge on topics such as health, hygiene, basic rights, digital literacy, and more — helping people grow personally and socially.</p>
          </div>
          <div className="help-item">
            <div className="help-icon">🎁 </div>
            <h4>Donation Drives</h4>
            <p>From clothing and food to school supplies and hygiene kits, we distribute essential items to underserved families. Every item donated goes directly to someone who needs it, ensuring dignity and impact.</p>
          </div>
          <div className="help-item">
            <div className="help-icon">🤝</div>
            <h4> Collaborations That Amplify Impact</h4>
            <p>We partner with local CHT-based government bodies and nonprofit organizations to expand our reach and strengthen our programs. These collaborations allow us to tackle systemic issues more effectively and sustainably.</p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="impact-section">
        <h2 className="section-title">Our Growing Impact</h2>
        <div className="impact-stats">
          <div className="impact-item">
            <div className="impact-number">5,000+ BDT</div>
            <div className="impact-label">Funds Raised</div>
            <div className="impact-description">Raised from donations and fundraising campaigns</div>
          </div>
          <div className="impact-item">
            <div className="impact-number">150+</div>
            <div className="impact-label">Children and Women Served</div>
            <div className="impact-description">Empowered through educational seminars and skill-building workshops</div>
          </div>
          <div className="impact-item">
            <div className="impact-number">5+</div>
            <div className="impact-label">Events Organized</div>
            <div className="impact-description">    Organized educational events on hygiene, health, and handwashing, aligned with the UN Sustainable Development Goals.
            </div>
          </div>
          <div className="impact-item">
            <div className="impact-number">3+</div>
            <div className="impact-label">Villages Reached</div>
            <div className="impact-description">Communities across the remote areas of the Chittagong Hill Tracts</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
