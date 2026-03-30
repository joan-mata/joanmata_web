import React from 'react';
import Badge from '../common/Badge';

const ProjectModal = ({ project, onClose, lang, translations }) => {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <header className="modal-header">
          <div>
            <h2 className="modal-title">{project.name}</h2>
            <span className="card-date">{project.date}</span>
          </div>
        </header>

        <div className="modal-body">
          <div className="modal-section">
            <p className="modal-description">{project.desc[lang]}</p>
          </div>

          <div className="modal-grid">
            <div className="modal-column">
              <h3 className="modal-subtitle">{translations.projects.techStack}</h3>
              <div className="badge-container">
                {project.techStack.map((tech, i) => (
                  <Badge key={i} text={tech} />
                ))}
              </div>

              <h3 className="modal-subtitle" style={{ marginTop: '2rem' }}>{translations.projects.security}</h3>
              <p className="card-content">{project.security[lang]}</p>
            </div>

            <div className="modal-column">
              <h3 className="modal-subtitle">{translations.projects.details}</h3>
              <ul className="card-list">
                {project.points[lang].map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>

              {project.links && (
                <>
                  <h3 className="modal-subtitle" style={{ marginTop: '2rem' }}>{translations.projects.links}</h3>
                  <div className="modal-links">
                    {project.links.github && (
                      <a href={`https://${project.links.github}`} target="_blank" rel="noreferrer" className="modal-link github">
                        {translations.projects.github}
                      </a>
                    )}
                    {project.links.live && (
                      <a href={`https://${project.links.live}`} target="_blank" rel="noreferrer" className="modal-link live">
                        {translations.projects.visit}
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
