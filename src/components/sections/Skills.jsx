import React from 'react';
import Badge from '../common/Badge';

const Skills = ({ title, data, isAdmin, onEdit, onAdd, translations }) => {
  const categories = Object.keys(data);

  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2 className="section-title">{title}</h2>
        {isAdmin && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="admin-icon static" onClick={onAdd}>+</button>
            <button className="admin-icon static" onClick={onEdit}>✎</button>
          </div>
        )}
      </div>

      <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
        {categories.map((cat) => (
          <div key={cat} className="skill-group-card" style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ color: 'var(--accent)', marginBottom: '1.5rem', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {translations.skills[cat]}
            </h3>
            <div className="badge-container" style={{ justifyContent: 'flex-start' }}>
              {data[cat].map((skill, idx) => (
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
