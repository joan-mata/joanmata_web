import React from 'react';
import Card from '../common/Card';

const Certificates = ({ title, data, lang, isAdmin, onEdit, onAdd }) => (
  <section className="container">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 className="section-title">{title}</h2>
      {isAdmin && <button className="admin-tool-btn" onClick={onAdd}>+ {title}</button>}
    </div>
    <div className="card-grid">
      {data.map((cert, idx) => (
        <Card key={idx} title={cert.title[lang]} subtitle={cert.issuer} date={cert.date}>
          {isAdmin && <button className="admin-icon" onClick={() => onEdit(idx)}>✎</button>}
        </Card>
      ))}
    </div>
  </section>
);
export default Certificates;
