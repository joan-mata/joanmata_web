import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Badge from '../common/Badge';

const ProjectDetailsPage = ({ data, lang, translations, isAdmin, onEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const project = data.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) return (
    <div className="container centered-page">
      <h2>Project Not Found</h2>
      <button className="cta-button" onClick={() => navigate('/projects')}>Back to Projects</button>
    </div>
  );

  return (
    <div className="project-detail-page">
      <div className="detail-top-nav">
        <Link to="/projects" className="back-link-btn">
          <span className="arrow">←</span> {translations.projects.close}
        </Link>
        {isAdmin && (
          <button className="cta-btn secondary edit-details-btn" onClick={() => onEdit(id)}>
            ✎ EDITAR DETALLES
          </button>
        )}
      </div>

      <header className="detail-hero">
        <div className="detail-hero-content">
          <span className="detail-category">{translations.sections.projects.toUpperCase()}</span>
          <h1 className="detail-main-title gradient-text">{project.name}</h1>
          <div className="detail-meta">
            <span className="card-date">{project.date}</span>
          </div>
        </div>
      </header>

      <div className="detail-grid-layout">
        <div className="detail-main-column">
          <section className="detail-glass-card">
            <h2 className="detail-section-title">{translations.projects.details}</h2>
            <p className="detail-long-description">
              {project.desc[lang]}
            </p>
            <ul className="detail-feature-list">
              {project.points[lang].map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </section>

          {project.security && project.security[lang] && (
            <section className="detail-glass-card">
              <h2 className="detail-section-title">{translations.projects.security}</h2>
              <ul className="detail-feature-list security-list">
                {Array.isArray(project.security[lang]) 
                  ? project.security[lang].map((point, i) => <li key={i}>{point}</li>)
                  : <li className="detail-security-text">{project.security[lang]}</li>}
              </ul>
            </section>
          )}
        </div>

        <aside className="detail-sidebar-column">
          <div className="detail-glass-card">
            <h2 className="detail-section-title">{translations.projects.techStack}</h2>
            <div className="detail-badge-cloud">
              {project.techStack.map((tech, i) => (
                <Badge key={i} text={tech} />
              ))}
            </div>
          </div>

          {project.links && (
            <div className="detail-glass-card">
              <h2 className="detail-section-title">{translations.projects.links}</h2>
              <div className="detail-actions-vertical">
                {project.links.github && (
                  <a href={`https://${project.links.github}`} target="_blank" rel="noreferrer" className="cta-btn secondary full-width">
                    {translations.projects.github.toUpperCase()}
                  </a>
                )}
                {project.links.live && (
                  <a href={`https://${project.links.live}`} target="_blank" rel="noreferrer" className="cta-btn full-width">
                    {translations.projects.miniVisit} WEB
                  </a>
                )}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
