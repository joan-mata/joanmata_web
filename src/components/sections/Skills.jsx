import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';

const Skills = ({ title, data }) => {
  return (
    <section>
      <h2 className="section-title">{title}</h2>
      <Card>
        <div className="badge-container">
          {data.map((skill, i) => (
            <Badge key={i} text={skill} />
          ))}
        </div>
      </Card>
    </section>
  );
};

export default Skills;
