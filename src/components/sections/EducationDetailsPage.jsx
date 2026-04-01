import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../../styles/Education.css';

const EducationDetailsPage = ({ data, lang, translations, isAdmin, onEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showViewer, setShowViewer] = useState(false);
  
  const edu = data.find(e => e.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!edu) return (
    <div className="container centered-page">
      <h2>Education Not Found</h2>
      <button className="cta-button" onClick={() => navigate('/education')}>Back to Education</button>
    </div>
  );

  return (
    <div className="project-detail-page education-detail-page">
      <div className="detail-top-nav">
        <Link to="/education" className="back-link-btn">
          <span className="arrow">←</span> {translations.projects.close}
        </Link>
        {isAdmin && (
          <button className="cta-btn secondary edit-details-btn" onClick={() => onEdit(id)}>
            ✎ {translations.education.editEducation.toUpperCase()}
          </button>
        )}
      </div>

      <header className="detail-hero">
        <div className="detail-hero-content">
          <span className="detail-category">{translations.nav.education.toUpperCase()}</span>
          <h1 className="detail-main-title gradient-text">{edu.title[lang]}</h1>
          <div className="detail-meta">
            <span className="card-date">{edu.date}</span>
          </div>
        </div>
      </header>

      <div className="detail-grid-layout">
        <div className="detail-main-column">
          <section className="detail-glass-card">
            <h2 className="detail-section-title">{translations.education.university}</h2>
            <div className="edu-school-name">{edu.school}</div>
          </section>

          <section className="detail-glass-card">
            <h2 className="detail-section-title">{translations.education.description}</h2>
            <p className="detail-long-description">
              {edu.explanation[lang]}
            </p>
          </section>

          {edu.tfg && edu.tfg.title && (
            <section className="detail-glass-card">
              <h2 className="detail-section-title">{translations.education.tfgTitle}</h2>
              <div className="tfg-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ flex: 1, minWidth: '300px' }}>
                    <h3 className="tfg-title">{edu.tfg.title[lang]}</h3>
                    <div className="tfg-meta" style={{ marginTop: '0.5rem' }}>
                      <span className="tfg-grade-label">{translations.education.grade}: </span>
                      <span className="tfg-grade-value">{edu.tfg.grade}</span>
                    </div>
                  </div>
                  
                  {edu.tfg.file && (
                    <button 
                      className={`cta-btn ${showViewer ? 'secondary' : 'primary'}`}
                      onClick={() => setShowViewer(!showViewer)}
                    >
                      {showViewer ? `✖ ${translations.education.closeViewer.toUpperCase()}` : `👁 ${translations.education.viewTfg.toUpperCase()}`}
                    </button>
                  )}
                </div>

                {showViewer && edu.tfg.file && (
                  <div className="pdf-viewer-container" style={{ marginTop: '2rem', height: '600px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <iframe 
                      src={`${edu.tfg.file}#toolbar=0`} 
                      width="100%" 
                      height="100%" 
                      title="TFG Viewer"
                      style={{ border: 'none' }}
                    />
                  </div>
                )}

                {edu.tfg.description && (
                  <div className="tfg-description" style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-dim)' }}>
                    {edu.tfg.description[lang]}
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        <aside className="detail-sidebar-column">
          <div className="detail-glass-card">
            <h2 className="detail-section-title">{translations.education.academicSummary}</h2>
            <div className="edu-stat-item">
              <span className="stat-label">{translations.education.status}: </span>
              <span className="stat-value">{edu.grade}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default EducationDetailsPage;
