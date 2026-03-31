import React from 'react';
import Card from '../common/Card';

const Volunteering = ({ title, data, lang, isAdmin, onAdd, onEdit }) => (
  <section className="container">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 className="section-title">{title}</h2>
      {isAdmin && <button className="admin-tool-btn" onClick={onAdd}>+ {title}</button>}
    </div>
    <div className="card-grid">
      {data.map((vol, idx) => (
        <Card key={idx} title={vol.role[lang]} subtitle={vol.organization} date={vol.date}>
          {isAdmin && <button className="admin-icon" onClick={() => onEdit(idx)}>✎</button>}
        </Card>
      ))}
    </div>
  </section>
);
export default Volunteering;
