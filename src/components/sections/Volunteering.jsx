import React from 'react';
import Card from '../common/Card';

const Volunteering = ({ title, data, lang, isAdmin, onAdd, onEdit }) => (
  <section className="container">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 className="section-title">{title}</h2>
      {isAdmin && <button className="admin-icon" onClick={onAdd} title={`Add ${title}`}>+</button>}
    </div>
    <div className="card-grid">
      {data.map((vol, idx) => (
        <Card key={idx} title={vol.org} subtitle={vol.location} date={vol.date}>
          {isAdmin && <button className="admin-icon" onClick={() => onEdit(idx)}>✎</button>}
          {vol.desc && <p className="card-content">{vol.desc[lang]}</p>}
        </Card>
      ))}
    </div>
  </section>
);
export default Volunteering;
