import React from 'react';
import Card from '../common/Card';

const Contact = ({ title, infoLabel, socialLabel, data }) => {
  return (
    <section>
      <h2 className="section-title">{title}</h2>
      <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <Card title={infoLabel} className="contact-card">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p className="card-content">📧 {data.email}</p>
            <p className="card-content">📱 {data.phone}</p>
            <p className="card-content">📍 {data.location}</p>
          </div>
        </Card>
        <Card title={socialLabel} className="contact-card">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p className="card-content">🔗 <a href={`https://${data.linkedin}`} target="_blank" rel="noreferrer">LinkedIn</a></p>
            <p className="card-content">💻 <a href={`https://${data.github}`} target="_blank" rel="noreferrer">GitHub</a></p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
