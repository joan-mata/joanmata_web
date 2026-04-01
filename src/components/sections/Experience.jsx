import { Link } from 'react-router-dom';
import Card from '../common/Card';

const Experience = ({ title, data, lang, isAdmin, onEdit, onAdd, translations }) => {
  return (
    <section id="experience">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 className="section-title">{title}</h2>
        {isAdmin && <button className="admin-icon static" onClick={onAdd}>+</button>}
      </div>
      
      <div className="card-grid">
        {data.map((exp, idx) => (
          <Card 
            key={idx}
            title={exp.company}
            subtitle={exp.role[lang]}
            date={exp.date}
            footer={
              <Link to={`/experience/${exp.id}`} className="card-details-btn">
                {translations.experience.details}
              </Link>
            }
          >
            {isAdmin && <button className="admin-icon entry-edit-btn" onClick={() => onEdit(idx)}>✎</button>}
            <ul className="card-list">
              {exp.points[lang].slice(0, 3).map((point, i) => (
                <li key={i}>{point}</li>
              ))}
              {exp.points[lang].length > 3 && (
                <li style={{ listStyle: 'none', opacity: 0.6, fontSize: '0.85rem' }}>...</li>
              )}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Experience;
