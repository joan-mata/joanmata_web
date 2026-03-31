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
    const newList = [...(formData[field][lang] || []), ""];
    handleChange(field, newList, lang);
  };

  const removeListItem = (field, index, lang) => {
    const newList = formData[field][lang].filter((_, i) => i !== index);
    handleChange(field, newList, lang);
  };

  const renderExperienceForm = () => (
    <>
      <div className="form-group">
        <label>Compañía / Institución</label>
        <input 
          className="admin-input" 
          value={formData.company || formData.school || ''} 
          onChange={(e) => handleChange(formData.company ? 'company' : 'school', e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label>Cargo / Título (ES-CA-EN)</label>
        <div className="lang-row">
          <input placeholder="ES" className="admin-input" value={formData.role?.es || formData.title?.es || ''} onChange={(e) => handleChange(formData.role ? 'role' : 'title', e.target.value, 'es')} />
          <input placeholder="CA" className="admin-input" value={formData.role?.ca || formData.title?.ca || ''} onChange={(e) => handleChange(formData.role ? 'role' : 'title', e.target.value, 'ca')} />
          <input placeholder="EN" className="admin-input" value={formData.role?.en || formData.title?.en || ''} onChange={(e) => handleChange(formData.role ? 'role' : 'title', e.target.value, 'en')} />
        </div>
      </div>
      <div className="form-group">
        <label>Fecha</label>
        <input className="admin-input" value={formData.date || ''} onChange={(e) => handleChange('date', e.target.value)} />
      </div>
      {formData.points && (
        <div className="form-group">
          <label>Puntos Clave (ES)</label>
          {formData.points.es.map((p, i) => (
            <div key={i} className="list-item-row">
              <input className="admin-input" value={p} onChange={(e) => handleListChange('points', i, e.target.value, 'es')} />
              <button onClick={() => removeListItem('points', i, 'es')}>×</button>
            </div>
          ))}
          <button className="add-btn" onClick={() => addListItem('points', 'es')}>+ Añadir Punto</button>
        </div>
      )}
    </>
  );

  const renderProjectForm = () => (
    <>
      <div className="form-group">
        <label>Nombre del Proyecto</label>
        <input className="admin-input" value={formData.name || ''} onChange={(e) => handleChange('name', e.target.value)} />
      </div>
      <div className="form-group">
        <label>Resumen (Descripción Corta - ES)</label>
        <textarea className="admin-textarea" value={formData.desc?.es || ''} onChange={(e) => handleChange('desc', e.target.value, 'es')} />
      </div>
      <div className="form-group">
        <label>Detalles Completos (Puntos clave - ES)</label>
        {formData.points?.es?.map((p, i) => (
          <div key={i} className="list-item-row">
            <input className="admin-input" value={p} onChange={(e) => handleListChange('points', i, e.target.value, 'es')} />
            <button onClick={() => removeListItem('points', i, 'es')}>×</button>
          </div>
        ))}
        <button className="add-btn" onClick={() => addListItem('points', 'es')}>+ Añadir Detalle</button>
      </div>
      <div className="form-group">
        <label>GitHub / Live Demo (URL)</label>
        <div className="lang-row">
          <input placeholder="GitHub" className="admin-input" value={formData.links?.github || ''} onChange={(e) => setFormData({...formData, links: {...formData.links, github: e.target.value}})} />
          <input placeholder="Live URL" className="admin-input" value={formData.links?.live || ''} onChange={(e) => setFormData({...formData, links: {...formData.links, live: e.target.value}})} />
        </div>
      </div>
    </>
  );

  const renderProfileForm = () => (
    <>
      <div className="form-group">
        <label>Descripción / Bio (ES)</label>
        <textarea className="admin-textarea" style={{height:'120px'}} value={formData.es || ''} onChange={(e) => setFormData({...formData, es: e.target.value})} />
      </div>
      <div className="form-group">
        <label>Descripció / Bio (CA)</label>
        <textarea className="admin-textarea" style={{height:'120px'}} value={formData.ca || ''} onChange={(e) => setFormData({...formData, ca: e.target.value})} />
      </div>
      <div className="form-group">
        <label>Description / Bio (EN)</label>
        <textarea className="admin-textarea" style={{height:'120px'}} value={formData.en || ''} onChange={(e) => setFormData({...formData, en: e.target.value})} />
      </div>
    </>
  );

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal-container glass">
        <div className="modal-header">
          <h2>{type === 'edit' ? 'Editar Entrada' : 'Añadir Nueva Entrada'}</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>
        
        <div className="modal-body">
          {type === 'profile' ? renderProfileForm() : (type === 'project' || formData.desc ? renderProjectForm() : renderExperienceForm())}
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
