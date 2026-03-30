import React from 'react';
import Card from '../common/Card';

const Experience = ({ title, data, lang }) => {
  return (
    <section>
      <h2 className="section-title">{title}</h2>
      <div className="card-grid">
        {data.map((exp, i) => (
          <Card 
            key={i}
            title={exp.role[lang]}
            subtitle={exp.company}
            date={exp.date}
          >
            <ul className="card-list">
              {exp.points[lang].map((p, j) => (
                <li key={j}>{p}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Experience;
