import React from 'react';
import Badge from '../common/Badge';

const Skills = ({ title, data, isAdmin, onEdit, onAdd }) => {
  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 className="section-title">{title}</h2>
        {isAdmin && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="admin-icon static" onClick={onAdd}>+</button>
            <button className="admin-icon static" onClick={onEdit}>✎</button>
          </div>
        )}
      </div>
      <div className="badge-container premium-skills">
        {data.map((skill, idx) => (
          <Badge key={idx} text={skill} />
        ))}
      </div>
    </section>
  );
};

export default Skills;
