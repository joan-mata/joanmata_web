import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Badge from '../common/Badge';

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
            <p className="card-desc-home">{exp.desc[lang]}</p>
            <div className="card-tags-home">
              {exp.tags && exp.tags.slice(0, 4).map((tag, i) => (
                <Badge key={i} text={tag} />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Experience;
