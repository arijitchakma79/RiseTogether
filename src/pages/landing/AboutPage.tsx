import React from 'react';
import '../../styles/landing/AboutPage.css';

const AboutPage: React.FC = () => {
  return (
    <div className="about-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">About RiseTogether</h1>
          <p className="hero-subtitle">
            Empowering communities through the transformative power of meaningful imagery
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Get Involved</button>
            <button className="btn-secondary">Our Impact</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="/src/assets/images/about1.jpg" alt="RiseTogether community impact" />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="mission-card">
          <div className="card-icon">🎯</div>
          <h3>Our Mission</h3>
          <p>
            To bridge the digital divide by donating high-quality, meaningful images to individuals, 
            families, and organizations who lack access to professional photography and visual storytelling.
          </p>
        </div>
        <div className="vision-card">
          <div className="card-icon">✨</div>
          <h3>Our Vision</h3>
          <p>
            A world where every person and community has the visual tools to share their story, 
            preserve their memories, and showcase their unique identity with dignity and pride.
          </p>
        </div>
      </section>

      {/* How We Help */}
      <section className="how-we-help">
        <h2 className="section-title">How We Make a Difference</h2>
        <div className="help-grid">
          <div className="help-item">
            <div className="help-icon">📸</div>
            <h4>Professional Photography</h4>
            <p>Free professional photo sessions for families and individuals who cannot afford them</p>
          </div>
          <div className="help-item">
            <div className="help-icon">🏢</div>
            <h4>Organization Support</h4>
            <p>High-quality imagery for nonprofits and community organizations to enhance their outreach</p>
          </div>
          <div className="help-item">
            <div className="help-icon">📖</div>
            <h4>Story Preservation</h4>
            <p>Documenting and preserving important community stories and cultural heritage</p>
          </div>
          <div className="help-item">
            <div className="help-icon">🤝</div>
            <h4>Community Events</h4>
            <p>Coverage of local events, celebrations, and milestones at no cost to the community</p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="impact-section">
        <h2 className="section-title">Our Growing Impact</h2>
        <div className="impact-stats">
          <div className="impact-item">
            <div className="impact-number">5,000+</div>
            <div className="impact-label">Images Donated</div>
            <div className="impact-description">Professional photos delivered to families and organizations</div>
          </div>
          <div className="impact-item">
            <div className="impact-number">150+</div>
            <div className="impact-label">Families Served</div>
            <div className="impact-description">Capturing precious moments and preserving memories</div>
          </div>
          <div className="impact-item">
            <div className="impact-number">25+</div>
            <div className="impact-label">Community Partners</div>
            <div className="impact-description">Local organizations we've supported with visual content</div>
          </div>
          <div className="impact-item">
            <div className="impact-number">12</div>
            <div className="impact-label">Cities Reached</div>
            <div className="impact-description">Communities across the region benefiting from our work</div>
          </div>
        </div>
      </section>

      {/* Event Highlights */}
      <section className="highlights-section">
        <h2 className="section-title">Recent Highlights</h2>
        <div className="slideshow-scroll">
          <div className="slide-track">
            <div className="slide-item">
              <img src="/src/assets/images/about1.jpg" alt="Community gathering" />
              <div className="slide-caption">Community Unity Festival</div>
            </div>
            <div className="slide-item">
              <img src="/src/assets/images/about1.jpg" alt="Family portrait session" />
              <div className="slide-caption">Free Family Portrait Day</div>
            </div>
            <div className="slide-item">
              <img src="/src/assets/images/about1.jpg" alt="Local business support" />
              <div className="slide-caption">Small Business Spotlight</div>
            </div>
            <div className="slide-item">
              <img src="/src/assets/images/about1.jpg" alt="Youth program" />
              <div className="slide-caption">Youth Empowerment Workshop</div>
            </div>
            <div className="slide-item">
              <img src="/src/assets/images/about1.jpg" alt="Senior portraits" />
              <div className="slide-caption">Senior Appreciation Event</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <h2 className="section-title">Our Core Values</h2>
        <div className="values-grid">
          <div className="value-item">
            <h4>Dignity</h4>
            <p>Every person deserves to be seen and celebrated with respect and honor</p>
          </div>
          <div className="value-item">
            <h4>Accessibility</h4>
            <p>Professional imagery should be available to all, regardless of economic circumstances</p>
          </div>
          <div className="value-item">
            <h4>Community</h4>
            <p>We believe in the power of collective support and shared storytelling</p>
          </div>
          <div className="value-item">
            <h4>Quality</h4>
            <p>We maintain the highest standards in every image we create and deliver</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Make a Difference?</h2>
          <p>Join us in our mission to empower communities through meaningful imagery</p>
          <div className="cta-buttons">
            <button className="btn-primary">Volunteer With Us</button>
            <button className="btn-secondary">Request Services</button>
            <button className="btn-outline">Learn More</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
