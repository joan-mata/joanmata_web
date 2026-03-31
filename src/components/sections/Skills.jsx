import React from 'react';
import Badge from '../common/Badge';

const Skills = ({ title, data, isAdmin, onEdit }) => {
  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 className="section-title">{title}</h2>
        {isAdmin && <button className="admin-icon" onClick={onEdit}>✎</button>}
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
