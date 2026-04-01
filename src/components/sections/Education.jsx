import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../common/Card';
import Badge from '../common/Badge';

const Education = ({ title, data, lang, isAdmin, onEdit, onAdd, translations }) => {
  const navigate = useNavigate();

  return (
    <section className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="section-title">{title}</h2>
        {isAdmin && <button className="admin-icon static" onClick={onAdd} title={`Add ${title}`}>+</button>}
      </div>
      
      <div className="card-grid">
        {data.map((edu, idx) => {
          const eduId = edu.id || `edu-${idx}`;
          return (
            <Card 
              key={eduId}
              title={edu.title[lang]}
              date={edu.date}
              translations={translations}
            >
              {isAdmin && (
                <button 
                  className="admin-icon entry-edit-btn" 
                  onClick={(e) => { e.stopPropagation(); onEdit(idx); }}
                >
                  ✎
                </button>
              )}

              <div className="card-content" style={{ marginBottom: '1.5rem' }}>
                <div className="badge-container">
                  <Badge text={edu.category[lang]} />
                </div>
              </div>
              
              <div className="card-footer-actions">
                <button 
                  className="card-details-btn"
                  onClick={(e) => { e.stopPropagation(); navigate(`/education/${eduId}`); }}
                >
                  {translations.projects.details}
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default Education;
