import React from 'react';
import Card from '../common/Card';

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

      <div className="card-grid">
        <Card title={infoLabel || 'CONTACTO DIRECTO'}>
          <div className="card-icon" style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>✉️</div>
          <div className="card-actions-box" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a href={`mailto:${data.email}`} className="cta-btn secondary full-width">
              {data.email}
            </a>
            <div className="cta-btn secondary full-width disabled-btn">
              📱 {data.phone}
            </div>
          </div>
        </Card>

        <Card title={socialLabel || 'REDES PROFESIONALES'}>
          <div className="card-icon" style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>🌐</div>
          <div className="card-actions-box" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a href={`https://${data.linkedin}`} target="_blank" rel="noreferrer" className="cta-btn full-width">
              LINKEDIN
            </a>
            <a href={`https://${data.github}`} target="_blank" rel="noreferrer" className="cta-btn secondary full-width">
              GITHUB
            </a>
          </div>
        </Card>
      </div>

      <div className="contact-footer-action">
        <div className="cv-download-box glass" style={{ maxWidth: '600px', margin: '4rem auto 0', padding: '2.5rem', borderRadius: '30px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '800' }}>🚀 {translations?.hero?.downloadCV || 'Download CV'}</h3>
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
