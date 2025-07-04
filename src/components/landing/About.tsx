import React, { useState, useEffect } from 'react';
import '../../styles/landing/About.css';
import about1 from '../../assets/images/about1.jpg';

const About: React.FC = () => {
  const stats = [
    { number: '50+', label: 'Donations Made' },
    { number: '40+', label: 'Children Helped' },
    { number: '5+', label: 'Active Members' },
    { number: '3+', label: 'Workshops Conducted' }
  ];

  // For now we'll use the same image multiple times as placeholders
  // TODO: Replace with actual different images once available
  const images = [
    { src: about1, alt: 'Children receiving donations' },
    { src: about1, alt: 'Community workshop session' },
    { src: about1, alt: 'Volunteer team meeting' },
    { src: about1, alt: 'Distribution event' }
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentImage(prev => (prev + 1) % images.length);
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  const goToNextSlide = () => {
    setCurrentImage(prev => (prev + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setCurrentImage(prev => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentImage(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(prev => !prev);
  };

  return (
    <section id="about" className="about-section">
      <h2>About Us</h2>
      <div className="about-content">
        <div className="about-text">
          <p>
            RiseTogether is a grassroots nonprofit organization dedicated to bridging the gap between those who have and those in need. 
            We empower individuals from marginalized communities in the Chittagong Hill Tracts by connecting them directly with compassionate donors.
          </p>
          <p>
            Through our transparent and user-friendly platform, people can request or contribute items like clothing, food, educational tools, 
            and more — all with dignity, empathy, and trust. Whether it's a child in need of a school bag or a family seeking warmth in winter, 
            RiseTogether ensures that every act of kindness reaches those who need it most.
          </p>
          <p>
            We believe that when communities unite in care and action, we don't just help — we rise, together.
          </p>
        </div>

        <div className="about-slideshow">
          <div className="slideshow-container">
            <img src={images[currentImage].src} alt={images[currentImage].alt} />
            
            <div className="slideshow-controls">
              <button 
                onClick={goToPrevSlide} 
                className="nav-button prev"
                aria-label="Previous slide"
              >
                &#10094;
              </button>
              <button 
                onClick={goToNextSlide} 
                className="nav-button next"
                aria-label="Next slide"
              >
                &#10095;
              </button>
            </div>

            <div className="slideshow-indicators">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${currentImage === index ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={toggleAutoPlay} 
              className={`autoplay-button ${isAutoPlaying ? 'playing' : ''}`}
              aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isAutoPlaying ? '⏸' : '▶'}
            </button>
          </div>
        </div>
      </div>

      <div className="about-stats">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <h3>{stat.number}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;  