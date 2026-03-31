import React from 'react';
import Card from '../common/Card';

const Experience = ({ title, data, lang, isAdmin, onEdit, onAdd }) => {
  return (
    <section id="experience">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 className="section-title">{title}</h2>
        {isAdmin && <button className="admin-icon" onClick={onAdd}>+</button>}
      </div>
      
      <div className="card-grid">
        {data.map((exp, idx) => (
          <Card 
            key={idx}
            title={exp.company}
            subtitle={exp.role[lang]}
            date={exp.date}
          >
            {isAdmin && <button className="admin-icon entry-edit-btn" onClick={() => onEdit(idx)}>✎</button>}
            <ul className="card-list">
              {exp.points[lang].map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Experience;
