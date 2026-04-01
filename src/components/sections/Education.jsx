import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Education.css';

const Education = ({ title, data, lang, isAdmin, onEdit, onAdd, translations }) => {
  const navigate = useNavigate();

  return (
    <section className="container education-section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        {isAdmin && <button className="admin-icon static" onClick={onAdd} title={`Add ${title}`}>+</button>}
      </div>
      
      <div className="card-grid education-grid">
        {data.map((edu, idx) => (
          <div key={idx} className="glass-card education-card-compact">
            <div className="edu-card-content">
              <div className="edu-card-header">
                <span className="edu-category-tag">{edu.school}</span>
                <span className="edu-year-box">{edu.date}</span>
              </div>
              <h3 className="edu-card-title">{edu.title[lang]}</h3>
            </div>
            
            <div className="edu-card-actions">
              <button 
                className="cta-btn secondary small-btn" 
                onClick={() => navigate(`/education/${edu.id}`)}
              >
                VER DETALLES
              </button>
              {isAdmin && (
                <button 
                  className="admin-edit-btn" 
                  onClick={(e) => { e.stopPropagation(); onEdit(idx); }}
                >
                  ✎
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
