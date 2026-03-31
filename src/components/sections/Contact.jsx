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
          <div className="contact-list-horizontal">
            <a href={`mailto:${data.email}`} className="cta-btn secondary">📧 {data.email}</a>
            <span className="cta-btn secondary">📱 {data.phone}</span>
          </div>
          
          <div className="contact-actions" style={{ marginTop: '2rem' }}>
            <button className="cta-button" onClick={handleDownload}>
              {translations?.hero?.downloadCV?.toUpperCase() || 'DESCARGAR CV (PDF)'}
            </button>
          </div>
        </div>

        <div className="contact-card">
          <h3 className="modal-subtitle">{socialLabel || 'REDES'}</h3>
          <div className="contact-list-horizontal">
            <a href={`https://${data.linkedin}`} target="_blank" rel="noreferrer" className="cta-btn">LINKEDIN</a>
            <a href={`https://${data.github}`} target="_blank" rel="noreferrer" className="cta-btn">GITHUB</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
