import React from 'react';
import Badge from '../common/Badge';
import Card from '../common/Card';

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

      <div className="card-grid">
        {categories.map((cat) => (
          <Card key={cat} title={translations.skills[cat]}>
            <div className="badge-container" style={{ justifyContent: 'flex-start' }}>
              {(Array.isArray(data[cat]) ? data[cat] : (data[cat][lang] || [])).map((skill, idx) => (
                <Badge key={idx} text={skill} />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Skills;
