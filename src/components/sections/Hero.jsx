import React from 'react';

const Hero = ({ name, subtitle, profileText, translations }) => {
  const handleDownload = () => {
    const cvUrl = '/assets/cv-joan-mata.pdf';
    fetch(cvUrl, { method: 'HEAD' })
      .then(res => {
        if (res.ok) {
          window.open(cvUrl, '_blank');
        } else {
          alert(translations?.alerts?.pdfNotFound || 'PDF Not Found');
        }
      })
      .catch(() => {
        alert(translations?.alerts?.pdfNotFound || 'PDF Not Found');
      });
  };

  return (
    <section className="hero-section hero-centered">
      <div className="hero-content">
        <h1 className="hero-name">{name}</h1>
        <p className="hero-subtitle">{subtitle}</p>
        
        <div className="hero-profile-box glass">
          <p className="hero-profile">{profileText}</p>
        </div>
        
        <div className="hero-actions">
          <button className="cta-button" onClick={handleDownload}>
            {translations?.hero?.downloadCV || 'Download CV (PDF)'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
