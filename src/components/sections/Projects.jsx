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
        {isAdmin && <button className="admin-icon" onClick={onAdd} title={`Add ${title}`}>+</button>}
      </div>
      
      <div className="card-grid">
        {data.map((proj, idx) => (
          <Card 
            key={proj.id}
            title={proj.name}
            date={proj.date}
            onClick={() => handleProjectClick(proj.id)}
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

            <p className="card-content" style={{ marginBottom: '1.5rem' }}>{proj.desc[lang]}</p>
            
            <ul className="card-list" style={{ marginBottom: '1.5rem' }}>
              {proj.points[lang].slice(0, 5).map((point, i) => (
                <li key={i} style={{ fontSize: '0.9rem' }}>{point}</li>
              ))}
            </ul>

            <div className="badge-container">
              {proj.tags.map((tag, j) => (
                <Badge key={j} text={tag} />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Projects;
