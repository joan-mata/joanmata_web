import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';

const Certificates = ({ title, data, lang, isAdmin, onEdit, onAdd, translations }) => (
  <section className="container">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 className="section-title">{title}</h2>
        {isAdmin && <button className="admin-icon static" onClick={onAdd} title={`Add ${title}`}>+</button>}
    </div>
    <div className="card-grid">
      {data.map((cert, idx) => (
        <Card key={cert.id} title={cert.title} subtitle={cert.issuer} date={cert.date}>
          <div className="card-footer-actions">
            <Link to={`/certificates/${cert.id}`} className="card-details-btn">
              {translations.projects.details}
            </Link>
            {isAdmin && <button className="admin-icon" onClick={() => onEdit(idx)}>✎</button>}
          </div>
        </Card>
      ))}
    </div>
  </section>
);
export default Certificates;
