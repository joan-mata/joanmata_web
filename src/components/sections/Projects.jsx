import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../common/Card';
import Badge from '../common/Badge';

const Projects = ({ title, data, lang, translations, isAdmin, onEdit, onAdd }) => {
  const navigate = useNavigate();

  const handleProjectClick = (id) => {
    navigate(`/projects/${id}`);
  };

  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="section-title">{title}</h2>
        {isAdmin && <button className="admin-icon static" onClick={onAdd} title={`Add ${title}`}>+</button>}
      </div>
      
      <div className="card-grid">
        {data.map((proj, idx) => (
          <Card 
            key={proj.id}
            title={proj.name[lang]}
            date={proj.date}
            links={proj.links}
            translations={translations}
            className="project-card"
          >
            {isAdmin && (
              <button 
                className="admin-icon entry-edit-btn" 
                onClick={(e) => { e.stopPropagation(); onEdit(idx); }}
              >
                ✎
              </button>
            )}

            <p className="card-content" style={{ marginBottom: '1.5rem', color: 'var(--text-dim)', fontSize: '1.05rem', lineHeight: '1.6' }}>
              {proj.desc[lang]}
            </p>
            
            <div className="badge-container" style={{ marginBottom: '2rem' }}>
              {proj.tags.map((tag, j) => (
                <Badge key={j} text={tag} />
              ))}
            </div>

            <div className="card-footer-actions">
              <button 
                className="card-details-btn"
                onClick={(e) => { e.stopPropagation(); handleProjectClick(proj.id); }}
              >
                {translations.projects.details}
              </button>

              {proj.links?.live && (
                <a 
                  href={`https://${proj.links.live}`}
                  target="_blank"
                  rel="noreferrer"
                  className="card-web-btn"
                  onClick={(e) => e.stopPropagation()}
                >
                  {translations.projects.miniVisit}
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Projects;
