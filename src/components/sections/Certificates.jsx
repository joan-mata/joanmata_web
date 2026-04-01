import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';

const Certificates = ({ title, data, lang, isAdmin, onEdit, onAdd }) => (
  <section className="container">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 className="section-title">{title}</h2>
        {isAdmin && <button className="admin-icon static" onClick={onAdd} title={`Add ${title}`}>+</button>}
    </div>
    <div className="card-grid">
      {data.map((cert, idx) => (
        <Card key={idx} title={cert.title} subtitle={cert.issuer} date={cert.date}>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <Link to={`/certificates/${cert.id}`} className="cta-btn secondary mini">{translations.projects.details}</Link>
            {isAdmin && <button className="admin-icon" onClick={() => onEdit(idx)}>✎</button>}
          </div>
        </Card>
      ))}
    </div>
  </section>
);
export default Certificates;
