import React from 'react';
import Card from '../common/Card';

const Education = ({ title, data, lang }) => {
  return (
    <section>
      <h2 className="section-title">{title}</h2>
      <div className="card-grid">
        {data.map((edu, i) => (
          <Card 
            key={i}
            title={edu.title[lang]}
            subtitle={edu.school}
            date={edu.date}
          />
        ))}
      </div>
    </section>
  );
};

export default Education;
