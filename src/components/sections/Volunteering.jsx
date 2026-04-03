import React from 'react';
import Card from '../common/Card';

const Volunteering = ({ title, data, lang, isAdmin, onAdd, onEdit, translations }) => (
  <section>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 className="section-title">{title}</h2>
        {isAdmin && <button className="admin-icon static" onClick={onAdd} title={`Add ${title}`}>+</button>}
    </div>
    <div className="card-grid">
      {data.map((vol, idx) => (
        <Card 
          key={idx} 
          title={vol.org} 
          subtitle={vol.location} 
          date={vol.date}
          footer={<span style={{ color: 'var(--text-dim)', fontSize: '0.8rem', fontStyle: 'italic' }}>{translations.volunteering.descTitle || 'Voluntariado'}</span>}
        >
          {isAdmin && <button className="admin-icon entry-edit-btn" onClick={() => onEdit(idx)}>✎</button>}
          {vol.desc && <p className="card-content">{vol.desc[lang]}</p>}
        </Card>
      ))}
    </div>
  </section>
);
export default Volunteering;
