import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Badge from '../common/Badge';
import '../../styles/Education.css';

const EducationDetailsPage = ({ data, lang, translations, isAdmin, onEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
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
            ✎ EDITAR EDUCACIÓN
          </button>
        )}
      </div>

      <header className="detail-hero">
        <div className="detail-hero-content">
          <span className="detail-category">{translations.sections.education.toUpperCase()}</span>
          <h1 className="detail-main-title gradient-text">{edu.title[lang]}</h1>
          <div className="detail-meta">
            <span className="card-date">{edu.date}</span>
          </div>
        </div>
      </header>

      <div className="detail-grid-layout">
        <div className="detail-main-column">
          <section className="detail-glass-card">
            <h2 className="detail-section-title">Universidad / Institución</h2>
            <div className="edu-school-name">{edu.school}</div>
          </section>

          <section className="detail-glass-card">
            <h2 className="detail-section-title">Descripción y Objetivos</h2>
            <p className="detail-long-description">
              {edu.explanation[lang]}
            </p>
          </section>

          {edu.tfg && (
            <section className="detail-glass-card">
              <h2 className="detail-section-title">Trabajo de Fin de Grado (TFG)</h2>
              <div className="tfg-container">
                <h3 className="tfg-title">{edu.tfg.title[lang]}</h3>
                <div className="tfg-meta">
                  <span className="tfg-grade-label">Nota: </span>
                  <span className="tfg-grade-value">{edu.tfg.grade}</span>
                </div>
                {edu.tfg.link && edu.tfg.link !== '#' && (
                  <a href={edu.tfg.link} target="_blank" rel="noreferrer" className="cta-btn secondary tfg-download-btn">
                    📥 VER DOCUMENTO TFG
                  </a>
                )}
              </div>
            </section>
          )}
        </div>

        <aside className="detail-sidebar-column">
          <div className="detail-glass-card">
            <h2 className="detail-section-title">Resumen Académico</h2>
            <div className="edu-stat-item">
              <span className="stat-label">Estado: </span>
              <span className="stat-value">{edu.grade}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default EducationDetailsPage;
