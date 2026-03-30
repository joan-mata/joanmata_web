import React from 'react';
import Card from '../common/Card';

const Certificates = ({ title, data }) => {
  return (
    <section id="certificates">
      <h2 className="section-title">{title}</h2>
      <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {data.map((cert, i) => (
          <Card 
            key={i}
            title={cert.title}
            subtitle={cert.issuer}
            date={cert.date}
          />
        ))}
      </div>
    </section>
  );
};

export default Certificates;
