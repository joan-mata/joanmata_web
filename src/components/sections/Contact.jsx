import React from 'react';

const Contact = ({ title, infoLabel, socialLabel, data, translations }) => {
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
    <section className="contact-page">
      <header className="contact-hero">
        <span className="detail-category">{translations.nav.contact.toUpperCase()}</span>
        <h1 className="detail-main-title gradient-text">{title}</h1>
        <p className="contact-intro">{translations.contact.info}</p>
      </header>

      <div className="contact-grid">
        <div className="contact-feature-card glass">
          <div className="card-icon">✉️</div>
          <h3 className="card-label">{infoLabel || 'CONTACTO DIRECTO'}</h3>
          <div className="card-actions-box">
            <a href={`mailto:${data.email}`} className="cta-btn secondary full-width">
              {data.email}
            </a>
            <div className="cta-btn secondary full-width disabled-btn">
              📱 {data.phone}
            </div>
          </div>
        </div>

        <div className="contact-feature-card glass">
          <div className="card-icon">🌐</div>
          <h3 className="card-label">{socialLabel || 'REDES PROFESIONALES'}</h3>
          <div className="card-actions-box">
            <a href={`https://${data.linkedin}`} target="_blank" rel="noreferrer" className="cta-btn full-width">
              LINKEDIN
            </a>
            <a href={`https://${data.github}`} target="_blank" rel="noreferrer" className="cta-btn secondary full-width">
              GITHUB
            </a>
          </div>
        </div>
      </div>

      <div className="contact-footer-action">
        <div className="cv-download-box glass" style={{ maxWidth: '600px' }}>
          <h3>🚀 {translations?.hero?.downloadCV || 'Download CV'}</h3>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="cta-button" onClick={() => handleDownload('es')}>
              {translations?.hero?.downloadES.toUpperCase()}
            </button>
            <button className="cta-button" onClick={() => handleDownload('en')}>
              {translations?.hero?.downloadEN.toUpperCase()}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
