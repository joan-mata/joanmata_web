import React, { useState } from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import ProjectModal from './ProjectModal';

const Projects = ({ title, data, lang, translations }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden'; 
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto'; 
  };

  return (
    <section>
      <h2 className="section-title">{title}</h2>
      
      <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
        {data.map((proj) => (
          <Card 
            key={proj.id}
            title={proj.name}
            date={proj.date}
            onClick={() => openModal(proj)}
            links={proj.links}
            translations={translations}
            className="project-card"
          >
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

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={closeModal} 
          lang={lang} 
          translations={translations}
        />
      )}
    </section>
  );
};

export default Projects;
