import React from 'react';

const Hero = ({ name, subtitle, profileText, translations, isAdmin, onEdit }) => {
  const handleDownload = (type) => {
    const cvUrl = type === 'es' ? '/docs/cv/cv_joanmata_espanol.pdf' : '/docs/cv/cv_joanmata_english.pdf';
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
    <section className="hero">
      <h1 className="gradient-text">{name}</h1>
      <p>{subtitle}</p>
      
      <div className="profile-text" style={{ position: 'relative' }}>
        {isAdmin && <button className="admin-icon static" onClick={onEdit} style={{ top: '-1rem', right: '-1rem' }}>✎</button>}
        {profileText}
      </div>
      
      <div className="hero-actions" style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="cta-button" onClick={() => handleDownload('es')}>
          {translations?.hero?.downloadES || 'Descargar CV (ES)'}
        </button>
        <button className="cta-button" onClick={() => handleDownload('en')}>
          {translations?.hero?.downloadEN || 'Download CV (EN)'}
        </button>
      </div>
    </section>
  );
};

export default Hero;
