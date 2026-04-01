import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const ExperienceDetailsPage = ({ data, lang, translations, isAdmin, onEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const job = data.find(j => j.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!job) return (
    <div className="container centered-page">
      <h2>Job Experience Not Found</h2>
      <button className="cta-button" onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );

  return (
    <div className="project-detail-page">
      <div className="detail-top-nav">
        <Link to="/" className="back-link-btn">
          <span className="arrow">←</span> {translations.experience.close}
        </Link>
        {isAdmin && (
          <button className="cta-btn secondary edit-details-btn" onClick={() => onEdit(job.id)}>
            ✎ EDITAR DETALLES
          </button>
        )}
      </div>

      <header className="detail-hero">
        <div className="detail-hero-content">
          <span className="detail-category">{translations.sections.experience.toUpperCase()}</span>
          <h1 className="detail-main-title gradient-text">{job.company}</h1>
          <div className="detail-meta">
            <span className="card-subtitle" style={{ fontSize: '1.4rem' }}>{job.role[lang]}</span>
            <span className="card-date" style={{ marginLeft: '1rem' }}>{job.date}</span>
          </div>
        </div>
      </header>

      <div className="detail-grid-layout" style={{ gridTemplateColumns: '1fr' }}>
        <div className="detail-main-column">
          <section className="detail-glass-card">
            <h2 className="detail-section-title">{translations.experience.details}</h2>
            <ul className="detail-feature-list">
              {job.points[lang].map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetailsPage;
