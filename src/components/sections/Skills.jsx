import React from 'react';
import Badge from '../common/Badge';

const Skills = ({ title, data, lang, isAdmin, onEdit, onAdd, translations }) => {
  const categories = Object.keys(data);

  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2 className="section-title">{title}</h2>
        {isAdmin && (
          <button className="admin-icon static" onClick={onEdit}>✎</button>
        )}
      </div>

      <div className="card-grid skills-grid">
        {categories.map((cat) => (
          <div key={cat} className="skill-group-card">
            <h3 style={{ color: 'var(--accent)', marginBottom: '1.5rem', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {translations.skills[cat]}
            </h3>
            <div className="badge-container" style={{ justifyContent: 'flex-start' }}>
              {(Array.isArray(data[cat]) ? data[cat] : (data[cat][lang] || [])).map((skill, idx) => (
                <Badge key={idx} text={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
