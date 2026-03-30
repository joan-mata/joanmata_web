import React from 'react';
import Card from '../common/Card';

const Volunteering = ({ title, data, lang }) => {
  return (
    <section>
      <h2 className="section-title">{title}</h2>
      <div className="card-grid">
        {data.map((v, i) => (
          <Card 
            key={i}
            title={v.location}
            subtitle={v.org}
            date={v.date}
          >
            <p className="card-content">{v.desc[lang]}</p>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Volunteering;
