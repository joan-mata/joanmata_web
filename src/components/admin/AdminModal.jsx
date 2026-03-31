import React, { useState } from 'react';

const AdminModal = ({ type, initialData, onSave, onCancel, translations }) => {
  const [formData, setFormData] = useState(initialData || {});

  const handleChange = (field, value, lang = null) => {
    if (lang) {
      setFormData({
        ...formData,
        [field]: { ...formData[field], [lang]: value }
      });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleListChange = (field, index, value, lang) => {
    const newList = [...((formData[field] && formData[field][lang]) || [])];
    newList[index] = value;
    handleChange(field, newList, lang);
  };

  const addListItem = (field, lang) => {
    const fieldObj = formData[field] || {};
    const langList = fieldObj[lang] || [];
    const newList = [...langList, ""];
    handleChange(field, newList, lang);
  };

  const removeListItem = (field, index, lang) => {
    const newList = formData[field][lang].filter((_, i) => i !== index);
    handleChange(field, newList, lang);
  };

  const renderLanguageInputs = (label, field, isTextArea = false) => (
    <div className="form-group">
      <label>{label}</label>
      <div className="lang-column">
        {['es', 'ca', 'en'].map(lang => (
          <div key={lang} className="lang-row-input">
            <span className="lang-tag">{lang.toUpperCase()}</span>
            {isTextArea ? (
              <textarea 
                className="admin-textarea" 
                value={formData[field]?.[lang] || ''} 
                onChange={(e) => handleChange(field, e.target.value, lang)}
              />
            ) : (
              <input 
                className="admin-input" 
                value={formData[field]?.[lang] || ''} 
                onChange={(e) => handleChange(field, e.target.value, lang)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderMultilingualList = (label, field) => (
    <div className="form-group">
      <label>{label}</label>
      {['es', 'ca', 'en'].map(lang => (
        <div key={lang} className="lang-list-section">
          <span className="lang-tag-header">{lang.toUpperCase()}</span>
          {(formData[field]?.[lang] || []).map((p, i) => (
            <div key={i} className="list-item-row">
              <input 
                className="admin-input" 
                value={p} 
                onChange={(e) => handleListChange(field, i, e.target.value, lang)} 
              />
              <button className="remove-btn" onClick={() => removeListItem(field, i, lang)}>×</button>
            </div>
          ))}
          <button className="add-btn-small" onClick={() => addListItem(field, lang)}>+ Add {lang.toUpperCase()}</button>
        </div>
      ))}
    </div>
  );

  const renderExperienceForm = () => (
    <>
      <div className="form-group">
        <label>Compañía</label>
        <input className="admin-input" value={formData.company || ''} onChange={(e) => handleChange('company', e.target.value)} />
      </div>
      {renderLanguageInputs('Cargo', 'role')}
      <div className="form-group">
        <label>Fecha</label>
        <input className="admin-input" value={formData.date || ''} onChange={(e) => handleChange('date', e.target.value)} />
      </div>
      {renderMultilingualList('Puntos Clave', 'points')}
    </>
  );

  const renderProjectForm = () => (
    <>
      <div className="form-group">
        <label>Nombre del Proyecto</label>
        <input className="admin-input" value={formData.name || ''} onChange={(e) => handleChange('name', e.target.value)} />
      </div>
      {renderLanguageInputs('Descripción Corta', 'desc', true)}
      {renderMultilingualList('Detalles / Puntos Clave', 'points')}
      <div className="form-group">
        <label>Tags (Comas para separar)</label>
        <input 
          className="admin-input" 
          value={Array.isArray(formData.tags) ? formData.tags.join(', ') : (formData.tags || '')} 
          onChange={(e) => handleChange('tags', e.target.value.split(',').map(t => t.trim()))} 
        />
      </div>
      <div className="form-group">
        <label>Links (GitHub, Live URL)</label>
        <div className="lang-row">
          <input placeholder="GitHub URL" className="admin-input" value={formData.links?.github || ''} onChange={(e) => setFormData({...formData, links: {...formData.links, github: e.target.value}})} />
          <input placeholder="Live URL" className="admin-input" value={formData.links?.live || ''} onChange={(e) => setFormData({...formData, links: {...formData.links, live: e.target.value}})} />
        </div>
      </div>
    </>
  );

  const renderSkillsForm = () => (
    <div className="form-group">
      <label>Habilidades (Introduce las habilidades separadas por comas)</label>
      <textarea 
        className="admin-textarea" 
        style={{height: '150px'}}
        value={Array.isArray(formData) ? formData.join(', ') : (formData || '')} 
        onChange={(e) => setFormData(e.target.value.split(',').map(s => s.trim()))}
      />
    </div>
  );

  const renderEducationForm = () => (
    <>
      <div className="form-group">
        <label>Institución</label>
        <input className="admin-input" value={formData.school || ''} onChange={(e) => handleChange('school', e.target.value)} />
      </div>
      {renderLanguageInputs('Título', 'title')}
      <div className="form-group">
        <label>Fecha</label>
        <input className="admin-input" value={formData.date || ''} onChange={(e) => handleChange('date', e.target.value)} />
      </div>
    </>
  );

  const renderCertificateForm = () => (
    <>
      <div className="form-group">
        <label>Título del Certificado</label>
        <input className="admin-input" value={formData.title || ''} onChange={(e) => handleChange('title', e.target.value)} />
      </div>
      <div className="form-group">
        <label>Emisor</label>
        <input className="admin-input" value={formData.issuer || ''} onChange={(e) => handleChange('issuer', e.target.value)} />
      </div>
      <div className="form-group">
        <label>Fecha</label>
        <input className="admin-input" value={formData.date || ''} onChange={(e) => handleChange('date', e.target.value)} />
      </div>
    </>
  );

  const renderVolunteeringForm = () => (
    <>
      <div className="form-group">
        <label>Organización</label>
        <input className="admin-input" value={formData.org || ''} onChange={(e) => handleChange('org', e.target.value)} />
      </div>
      <div className="form-group">
        <label>Ubicación</label>
        <input className="admin-input" value={formData.location || ''} onChange={(e) => handleChange('location', e.target.value)} />
      </div>
      <div className="form-group">
        <label>Fecha</label>
        <input className="admin-input" value={formData.date || ''} onChange={(e) => handleChange('date', e.target.value)} />
      </div>
      {renderLanguageInputs('Descripción', 'desc', true)}
    </>
  );

  const renderProfileForm = () => renderLanguageInputs('Bio / Descripción de Perfil', null, true);

  const renderForm = () => {
    switch (type) {
      case 'experience': return renderExperienceForm();
      case 'project': return renderProjectForm();
      case 'skills': return renderSkillsForm();
      case 'education': return renderEducationForm();
      case 'certificate': return renderCertificateForm();
      case 'volunteering': return renderVolunteeringForm();
      case 'profile':
        return (
          <div className="form-group">
            <label>Bio / Descripción de Perfil</label>
            {['es', 'ca', 'en'].map(lang => (
              <div key={lang} className="lang-row-input">
                <span className="lang-tag">{lang.toUpperCase()}</span>
                <textarea 
                  className="admin-textarea" 
                  style={{height: '120px'}}
                  value={formData[lang] || ''} 
                  onChange={(e) => setFormData({...formData, [lang]: e.target.value})}
                />
              </div>
            ))}
          </div>
        );
      default: return <p>Formulario no encontrado para: {type}</p>;
    }
  };

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal-container glass">
        <div className="modal-header">
          <h2>{initialData ? 'Editar Entrada' : 'Añadir Nueva Entrada'}</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>
        
        <div className="modal-body">
          {renderForm()}
        </div>

        <div className="modal-footer">
          <button className="cta-button secondary" onClick={onCancel}>Descartar</button>
          <button className="cta-button" onClick={() => onSave(formData)}>Guardar Cambios</button>
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
