import React, { useState } from 'react';

const AdminModal = ({ type, initialData, onSave, onCancel, translations: tUI }) => {
  const [formData, setFormData] = useState(initialData || {});
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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

  // Helper for automatic translation
  const translateText = async (text, targetLang) => {
    if (!text) return '';
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
      const response = await fetch(url);
      const data = await response.json();
      return data[0].map(item => item[0]).join('');
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  };

  const performAutoTranslation = async (currentData) => {
    const updatedData = { ...currentData };
    
    // Define fields that need translation based on type
    const fieldsToTranslate = [];
    const listsToTranslate = [];

    if (type === 'experience') {
      fieldsToTranslate.push('role');
      listsToTranslate.push('points');
    } else if (type === 'project') {
      fieldsToTranslate.push('desc');
      listsToTranslate.push('points');
    } else if (type === 'education') {
      fieldsToTranslate.push('title');
    } else if (type === 'volunteering') {
      fieldsToTranslate.push('desc');
    } else if (type === 'profile') {
      // Profile is root-level es/ca/en
      const esBio = updatedData.es || '';
      updatedData.ca = await translateText(esBio, 'ca');
      updatedData.en = await translateText(esBio, 'en');
      return updatedData;
    }

    // Process single fields
    for (const field of fieldsToTranslate) {
      const esText = updatedData[field]?.es || '';
      if (esText) {
        updatedData[field].ca = await translateText(esText, 'ca');
        updatedData[field].en = await translateText(esText, 'en');
      }
    }

    // Process lists
    for (const field of listsToTranslate) {
      const esList = updatedData[field]?.es || [];
      if (esList.length > 0) {
        updatedData[field].ca = await Promise.all(esList.map(t => translateText(t, 'ca')));
        updatedData[field].en = await Promise.all(esList.map(t => translateText(t, 'en')));
      }
    }

    return updatedData;
  };

  const handleFinalSave = async () => {
    setIsSaving(true);
    try {
      const finalData = await performAutoTranslation(formData);
      onSave(finalData);
    } catch (error) {
      console.error('Save error:', error);
      onSave(formData); // Fallback to original data if translation fails
    } finally {
      setIsSaving(false);
    }
  };

  const handleManualTranslate = async (field, isList = false) => {
    setIsTranslating(true);
    try {
      const sourceText = isList 
        ? (formData[field]?.es || [])
        : (field ? formData[field]?.es : formData.es);

      const caTranslation = isList
        ? await Promise.all(sourceText.map(t => translateText(t, 'ca')))
        : await translateText(sourceText, 'ca');
      const enTranslation = isList
        ? await Promise.all(sourceText.map(t => translateText(t, 'en')))
        : await translateText(sourceText, 'en');

      if (isList) {
        setFormData({ ...formData, [field]: { ...formData[field], ca: caTranslation, en: enTranslation } });
      } else if (field) {
        setFormData({ ...formData, [field]: { ...formData[field], ca: caTranslation, en: enTranslation } });
      } else {
        setFormData({ ...formData, ca: caTranslation, en: enTranslation });
      }
    } finally {
      setIsTranslating(false);
    }
  };

  const renderLanguageInputs = (label, field, isTextArea = false) => (
    <div className="form-group">
      <div className="label-row-admin">
        <label>{label}</label>
        <button 
          className="translate-btn" 
          onClick={(e) => { e.preventDefault(); handleManualTranslate(field); }}
          disabled={isTranslating}
          title="Detect ES and translate to CA/EN"
        >
          {isTranslating ? '⌛...' : '✨ Traducir Ahora'}
        </button>
      </div>
      <div className="lang-column">
        {['es', 'ca', 'en'].map(lang => (
          <div key={lang} className="lang-row-input">
            <span className="lang-tag">{lang.toUpperCase()}</span>
            {isTextArea ? (
              <textarea 
                className="admin-textarea" 
                value={(field ? formData[field]?.[lang] : formData[lang]) || ''} 
                onChange={(e) => handleChange(field || lang, e.target.value, field ? lang : null)}
                placeholder={lang === 'es' ? 'Introduce texto en español...' : ''}
              />
            ) : (
              <input 
                className="admin-input" 
                value={(field ? formData[field]?.[lang] : formData[lang]) || ''} 
                onChange={(e) => handleChange(field || lang, e.target.value, field ? lang : null)}
                placeholder={lang === 'es' ? 'Introduce texto en español...' : ''}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderMultilingualList = (label, field) => (
    <div className="form-group">
      <div className="label-row-admin">
        <label>{label}</label>
        <button 
          className="translate-btn" 
          onClick={(e) => { e.preventDefault(); handleManualTranslate(field, true); }}
          disabled={isTranslating}
        >
          {isTranslating ? '⌛...' : '✨ Traducir Lista'}
        </button>
      </div>
      {['es', 'ca', 'en'].map(lang => (
        <div key={lang} className="lang-list-section">
          <span className="lang-tag-header">{lang.toUpperCase()}</span>
          {(formData[field]?.[lang] || []).map((p, i) => (
            <div key={i} className="list-item-row">
              <input 
                className="admin-input" 
                value={p} 
                onChange={(e) => handleListChange(field, i, e.target.value, lang)} 
                placeholder={lang === 'es' ? 'Nuevo punto...' : ''}
              />
              <button className="remove-btn" onClick={() => removeListItem(field, i, lang)}>×</button>
            </div>
          ))}
          <button className="add-btn-small" onClick={() => addListItem(field, lang)}>+ Añadir en {lang.toUpperCase()}</button>
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
        <div className="lang-row" style={{ display: 'flex', gap: '1rem' }}>
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

  const renderForm = () => {
    switch (type) {
      case 'experience': return renderExperienceForm();
      case 'project': return renderProjectForm();
      case 'skills': return renderSkillsForm();
      case 'education': return renderEducationForm();
      case 'certificate': return renderCertificateForm();
      case 'volunteering': return renderVolunteeringForm();
      case 'profile': return renderLanguageInputs('Bio / Descripción de Perfil', null, true);
      default: return <p>Formulario no encontrado: {type}</p>;
    }
  };

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal-container glass">
        <div className="modal-header">
          <h2>{initialData ? 'Editar Entrada' : 'Añadir Nueva Entrada'}</h2>
          <button className="close-btn" onClick={onCancel} disabled={isSaving}>×</button>
        </div>
        
        <div className="modal-body">
          {renderForm()}
        </div>

        <div className="modal-footer">
          <button className="cta-button secondary" onClick={onCancel} disabled={isSaving}>Descartar</button>
          <button 
            className="cta-button" 
            onClick={handleFinalSave} 
            disabled={isSaving}
          >
            {isSaving ? 'Guardando y Traduciendo...' : 'Guardar Cambios'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
