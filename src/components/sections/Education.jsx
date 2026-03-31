import React from 'react';
import Card from '../common/Card';

const Education = ({ title, data, lang, isAdmin, onEdit, onAdd }) => (
  <section className="container">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 className="section-title">{title}</h2>
      {isAdmin && <button className="admin-tool-btn" onClick={onAdd}>+ {title}</button>}
    </div>
    <div className="card-grid">
      {data.map((edu, idx) => (
        <Card key={idx} title={edu.title[lang]} subtitle={edu.school} date={edu.date}>
          {isAdmin && <button className="admin-icon" onClick={() => onEdit(idx)}>✎</button>}
        </Card>
      ))}
    </div>
  </section>
);
export default Education;
