import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../../styles/Education.css'; // Reusing similar styles

const CertificateDetailsPage = ({ data, lang, translations, isAdmin, onEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showViewer, setShowViewer] = useState(false);
  
  const cert = data.find(c => c.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!cert) return (
    <div className="container centered-page">
      <h2>Certificate Not Found</h2>
      <button className="cta-button" onClick={() => navigate('/certificates')}>Back to Certificates</button>
    </div>
  );

  return (
    <div className="project-detail-page education-detail-page">
      <div className="detail-top-nav">
        <Link to="/certificates" className="back-link-btn">
          <span className="arrow">←</span> {translations.projects.close}
        </Link>
        {isAdmin && (
          <button className="cta-btn secondary edit-details-btn" onClick={() => onEdit(id)}>
            ✎ EDIT
          </button>
        )}
      </div>

      <header className="detail-hero">
        <div className="detail-hero-content">
          <span className="detail-category">{translations.nav.certificates.toUpperCase()}</span>
          <h1 className="detail-main-title gradient-text">{cert.title}</h1>
          <div className="detail-meta">
            <span className="card-date">{cert.date}</span>
          </div>
        </div>
      </header>

      <div className="detail-grid-layout">
        <div className="detail-main-column">
          <section className="detail-glass-card">
            <h2 className="detail-section-title">{translations.certificates.issuer}</h2>
            <div className="edu-school-name">{cert.issuer}</div>
          </section>

          <section className="detail-glass-card">
            <h2 className="detail-section-title">{translations.certificates.detailsTitle}</h2>
            <p className="detail-long-description">
              {cert.description[lang]}
            </p>
          </section>

          {cert.file && (
            <section className="detail-glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 className="detail-section-title" style={{ margin: 0 }}>Documento Oficial</h2>
                <button 
                  className={`cta-btn ${showViewer ? 'secondary' : 'primary'}`}
                  onClick={() => setShowViewer(!showViewer)}
                >
                  {showViewer ? `✖ ${translations.certificates.closeViewer.toUpperCase()}` : `👁 ${translations.certificates.viewCert.toUpperCase()}`}
                </button>
              </div>

              {showViewer && (
                <div className="pdf-viewer-container" style={{ height: '600px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <iframe 
                    src={`${cert.file}#toolbar=0`} 
                    width="100%" 
                    height="100%" 
                    title="Certificate Viewer"
                    style={{ border: 'none' }}
                  />
                </div>
              )}
            </section>
          )}
        </div>

        <aside className="detail-sidebar-column">
          <div className="detail-glass-card">
            <h2 className="detail-section-title">Expedición</h2>
            <div className="edu-stat-item">
              <span className="stat-label">{translations.certificates.dateTitle}: </span>
              <span className="stat-value">{cert.date}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CertificateDetailsPage;
