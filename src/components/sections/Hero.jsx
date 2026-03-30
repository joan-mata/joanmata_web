import React from 'react';

const Hero = ({ name, subtitle, profileText, translations }) => {
  const handleDownload = () => {
    // Check if CV file exists (this is a client-side check, usually we attempt a fetch or just point to the link)
    // For now, we simulate the 'not found' popup if the user hasn't uploaded it.
    const cvUrl = '/assets/cv-joan-mata.pdf'; 
    
    // Attempting to see if it exists (HEAD request)
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
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-name">{name}</h1>
        <p className="hero-subtitle">{subtitle}</p>
        <p className="hero-profile">{profileText}</p>
        
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
