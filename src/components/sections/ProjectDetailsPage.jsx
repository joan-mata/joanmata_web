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
        <Link to="/projects" className="back-link">
          &larr; {translations.projects.close}
        </Link>
        {isAdmin && (
          <button className="admin-icon" onClick={() => onEdit(id)}>
            ✎ EDITAR DETALLES
          </button>
        )}
      </div>

      <div className="detail-content-box">
        <div className="detail-info-main">
          <header className="detail-header">
            <h1 className="detail-title gradient-text">{project.name}</h1>
            <span className="card-date">{project.date}</span>
          </header>

          <section className="detail-info-section">
            <p className="detail-description" style={{ fontSize: '1.2rem', marginBottom: '3rem', opacity: 0.9 }}>
              {project.desc[lang]}
            </p>

            <h3>{translations.projects.details}</h3>
            <ul className="detail-list">
              {project.points[lang].map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>

            <h3 style={{ marginTop: '3rem' }}>{translations.projects.security}</h3>
            <p style={{ opacity: 0.85 }}>{project.security[lang]}</p>
          </section>
        </div>

        <div className="sidebar">
          <div className="sidebar-box">
            <h3>{translations.projects.techStack}</h3>
            <div className="badge-container">
              {project.techStack.map((tech, i) => (
                <Badge key={i} text={tech} />
              ))}
            </div>
          </div>

          {project.links && (
            <div className="sidebar-box" style={{ marginTop: '3rem' }}>
              <h3>{translations.projects.links}</h3>
              <div className="detail-links-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {project.links.github && (
                  <a href={`https://${project.links.github}`} target="_blank" rel="noreferrer" className="card-action-btn">
                    {translations.projects.github}
                  </a>
                )}
                {project.links.live && (
                  <a href={`https://${project.links.live}`} target="_blank" rel="noreferrer" className="card-action-btn" style={{ background: 'var(--accent-secondary)' }}>
                    {translations.projects.visit}
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
