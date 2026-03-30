import React from 'react';

const Contact = ({ title, infoLabel, socialLabel, data, translations }) => {
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
    <section>
      <h2 className="section-title">{title}</h2>
      
      <div className="contact-grid">
        <div className="contact-card">
          <h3 className="modal-subtitle">{infoLabel}</h3>
          <p className="contact-item">📧 {data.email}</p>
          <p className="contact-item">📱 {data.phone}</p>
          <p className="contact-item">📍 {data.location}</p>
          
          <div className="contact-actions" style={{ marginTop: '2rem' }}>
            <button className="cta-button" onClick={handleDownload}>
              {translations?.hero?.downloadCV || 'Download CV (PDF)'}
            </button>
          </div>
        </div>

        <div className="contact-card">
          <h3 className="modal-subtitle">{socialLabel}</h3>
          <a href={`https://${data.linkedin}`} target="_blank" rel="noreferrer" className="social-link">LinkedIn</a>
          <a href={`https://${data.github}`} target="_blank" rel="noreferrer" className="social-link">GitHub</a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
