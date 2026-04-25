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

  const addSubItem = () => {
    const newId = `item-${Date.now()}`;
    const newItems = [...(formData.subItems || []), {
      id: newId,
      title: { es: '', ca: '', en: '' },
      desc: { es: '', ca: '', en: '' },
      points: { es: [], ca: [], en: [] }
    }];
    handleChange('subItems', newItems);
  };

  const removeSubItem = (idx) => {
    const newItems = formData.subItems.filter((_, i) => i !== idx);
    handleChange('subItems', newItems);
  };

  const handleSubItemChange = (idx, field, value, lang = null) => {
    const newItems = [...formData.subItems];
    if (lang) {
      newItems[idx][field] = { ...newItems[idx][field], [lang]: value };
    } else {
      newItems[idx][field] = value;
    }
    handleChange('subItems', newItems);
  };

  const handleSubItemListChange = (idx, field, listIdx, value, lang) => {
    const newItems = [...formData.subItems];
    const newList = [...(newItems[idx][field][lang] || [])];
    newList[listIdx] = value;
    newItems[idx][field][lang] = newList;
    handleChange('subItems', newItems);
  };

  const addSubItemListItem = (idx, field, lang) => {
    const newItems = [...formData.subItems];
    const newList = [...(newItems[idx][field][lang] || []), ""];
    newItems[idx][field][lang] = newList;
    handleChange('subItems', newItems);
  };

  const removeSubItemListItem = (idx, field, listIdx, lang) => {
    const newItems = [...formData.subItems];
    const newList = newItems[idx][field][lang].filter((_, i) => i !== listIdx);
    newItems[idx][field][lang] = newList;
    handleChange('subItems', newItems);
  };

  // Helper for automatic translation
  const translateText = async (text, targetLang) => {
    if (!text) return '';
    // Whitelist: only allow known target languages
    const allowedLangs = ['en', 'ca'];
    if (!allowedLangs.includes(targetLang)) return text;
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
      fieldsToTranslate.push('desc');
      listsToTranslate.push('points');
    } else if (type === 'project') {
      fieldsToTranslate.push('desc');
      listsToTranslate.push('points');
    } else if (type === 'education') {
      fieldsToTranslate.push('title');
    } else if (type === 'skills') {
      listsToTranslate.push('leadership');
    } else if (type === 'certificate') {
      fieldsToTranslate.push('description');
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

    // Process sub-items
    if (updatedData.subItems) {
      for (const item of updatedData.subItems) {
        if (!item.title) item.title = { es: '', ca: '', en: '' };
        if (!item.desc) item.desc = { es: '', ca: '', en: '' };
        if (!item.points) item.points = { es: [], ca: [], en: [] };
        
        // Title
        const esTitle = item.title?.es || '';
        if (esTitle) {
          item.title.ca = await translateText(esTitle, 'ca');
          item.title.en = await translateText(esTitle, 'en');
        }
        // Desc
        const esDesc = item.desc?.es || '';
        if (esDesc) {
          item.desc.ca = await translateText(esDesc, 'ca');
          item.desc.en = await translateText(esDesc, 'en');
        }
        // Points
        const esPts = item.points?.es || [];
        if (esPts.length > 0) {
          item.points.ca = await Promise.all(esPts.map(p => translateText(p, 'ca')));
          item.points.en = await Promise.all(esPts.map(p => translateText(p, 'en')));
        }
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
        : (field ? formData[field]?.es : (formData.es || formData.leadership?.es || ''));

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
      {renderLanguageInputs('Mini Resumen / Extracto', 'desc', true)}
      <div className="form-group">
        <label>Fecha</label>
        <input className="admin-input" value={formData.date || ''} onChange={(e) => handleChange('date', e.target.value)} />
      </div>
      <div className="form-group">
        <label>Tags (Separados por comas)</label>
        <input 
          className="admin-input" 
          value={Array.isArray(formData.tags) ? formData.tags.join(', ') : (formData.tags || '')} 
          onChange={(e) => handleChange('tags', e.target.value.split(',').map(t => t.trim()))} 
        />
      </div>
      {renderMultilingualList('Responsabilidades y Logros', 'points')}
      
      <div className="admin-subitems-section">
        <h3 className="admin-sub-section-title">Gestión de Cuadros (Sub-ítems)</h3>
        <p className="admin-help-text">Cada cuadro aparecerá como una ventana de detalles independiente en la web.</p>
        
        <div className="admin-subitem-grid-editor">
          {(formData.subItems || []).map((si, idx) => (
            <div key={idx} className="admin-subitem-card glass">
              <div className="subitem-header">
                <span className="subitem-number">#{idx + 1}</span>
                <button className="remove-btn-small" onClick={() => removeSubItem(idx)} title="Eliminar este cuadro">🗑️</button>
              </div>
              
              <div className="form-group-compact">
                <label>ID / Icono sugerido</label>
                <input 
                  className="admin-input-small" 
                  value={si.id || ''} 
                  onChange={(e) => handleSubItemChange(idx, 'id', e.target.value)}
                  placeholder="ej: tfg-ciber"
                />
              </div>

              {/* Sub-item Title */}
              <div className="form-group-compact">
                <label>Título del Cuadro</label>
                {['es', 'ca', 'en'].map(lang => (
                  <div key={lang} className="lang-row-compact">
                    <span className="lang-mini-tag">{lang}</span>
                    <input 
                      className="admin-input-small" 
                      value={si.title[lang] || ''} 
                      onChange={(e) => handleSubItemChange(idx, 'title', e.target.value, lang)}
                    />
                  </div>
                ))}
              </div>

              {/* Sub-item Desc */}
              <div className="form-group-compact">
                <label>Descripción / Extracto</label>
                {['es', 'ca', 'en'].map(lang => (
                  <div key={lang} className="lang-row-compact">
                    <span className="lang-mini-tag">{lang}</span>
                    <textarea 
                      className="admin-textarea-mini" 
                      value={si.desc[lang] || ''} 
                      onChange={(e) => handleSubItemChange(idx, 'desc', e.target.value, lang)}
                    />
                  </div>
                ))}
              </div>

              {/* Sub-item Points */}
              <div className="form-group-compact">
                <label>Puntos Clave</label>
                {['es', 'ca', 'en'].map(lang => (
                  <div key={lang} className="lang-points-mini">
                    <span className="lang-mini-tag">{lang.toUpperCase()}</span>
                    {(si.points[lang] || []).map((p, pIdx) => (
                      <div key={pIdx} className="list-item-row-compact">
                        <input 
                          className="admin-input-mini" 
                          value={p} 
                          onChange={(e) => handleSubItemListChange(idx, 'points', pIdx, e.target.value, lang)} 
                        />
                        <button className="remove-btn-mini" onClick={() => removeSubItemListItem(idx, 'points', pIdx, lang)}>×</button>
                      </div>
                    ))}
                    <button className="add-btn-mini" onClick={() => addSubItemListItem(idx, 'points', lang)}>+ Añadir Punto</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="add-btn full-width highlight" onClick={addSubItem}>+ Añadir Nueva Ventana / Cuadrado</button>
      </div>
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
    <div className="skills-form-container">
      <div className="form-group">
        <label>Software & Web (Comas)</label>
        <textarea 
          className="admin-textarea-small" 
          value={Array.isArray(formData.software) ? formData.software.join(', ') : ''} 
          onChange={(e) => handleChange('software', e.target.value.split(',').map(s => s.trim()))}
        />
      </div>
      <div className="form-group">
        <label>IA & Data Science (Comas)</label>
        <textarea 
          className="admin-textarea-small" 
          value={Array.isArray(formData.ai) ? formData.ai.join(', ') : ''} 
          onChange={(e) => handleChange('ai', e.target.value.split(',').map(s => s.trim()))}
        />
      </div>
      <div className="form-group">
        <label>Web Scraping & Ingestión (Comas)</label>
        <textarea 
          className="admin-textarea-small" 
          value={Array.isArray(formData.scraping) ? formData.scraping.join(', ') : ''} 
          onChange={(e) => handleChange('scraping', e.target.value.split(',').map(s => s.trim()))}
        />
      </div>
      <div className="form-group">
        <label>Infraestructura & DevOps (Comas)</label>
        <textarea 
          className="admin-textarea-small" 
          value={Array.isArray(formData.infrastructure) ? formData.infrastructure.join(', ') : ''} 
          onChange={(e) => handleChange('infrastructure', e.target.value.split(',').map(s => s.trim()))}
        />
      </div>
      <div className="form-group">
        <label>Hardware & Embedded (Comas)</label>
        <textarea 
          className="admin-textarea-small" 
          value={Array.isArray(formData.hardware) ? formData.hardware.join(', ') : ''} 
          onChange={(e) => handleChange('hardware', e.target.value.split(',').map(s => s.trim()))}
        />
      </div>
      {renderMultilingualList('Soft Skills / Liderazgo (Traducción)', 'leadership')}
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
      <div className="form-group">
        <label>Ruta al PDF (ej: /docs/certs/archivo.pdf)</label>
        <input className="admin-input" value={formData.file || ''} onChange={(e) => handleChange('file', e.target.value)} />
      </div>
      {renderLanguageInputs('Descripción del Certificado', 'description', true)}
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

  const renderSubItemForm = () => (
    <div className="admin-subitem-granular-editor">
      <h3 className="admin-sub-section-title">Editar Detalle Específico</h3>
      <div className="form-group">
        <label>ID / Identificador</label>
        <input 
          className="admin-input" 
          value={formData.id || ''} 
          onChange={(e) => handleChange('id', e.target.value)}
        />
      </div>
      {renderLanguageInputs('Título del Cuadro', 'title')}
      {renderLanguageInputs('Descripción / Extracto', 'desc', true)}
      {renderMultilingualList('Puntos Clave', 'points')}
    </div>
  );

  const renderForm = () => {
    switch (type) {
      case 'experience': return renderExperienceForm();
      case 'subitem': return renderSubItemForm();
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
