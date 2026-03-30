import React, { useState } from 'react';

const AdminDashboard = ({ data, translations, onSave, onCancel, lang }) => {
  const [editedData, setEditedData] = useState({ ...data });
  const [isAutoTranslate, setIsAutoTranslate] = useState(true);

  const handleProfileChange = (l, value) => {
    const updatedProfile = { ...editedData.profile, [l]: value };
    
    // Auto-translation mock logic
    if (isAutoTranslate && l === 'es') {
      // In a real scenario, this would call a Translation API (DeepL, Google, etc)
      // Here we simulate it with a suffix for demonstration
      if (!updatedProfile.en || updatedProfile.en.includes('(Auto-translated)')) {
        updatedProfile.en = value + ' (Auto-translated to EN)';
      }
      if (!updatedProfile.ca || updatedProfile.ca.includes('(Auto-translated)')) {
        updatedProfile.ca = value + ' (Auto-translated to CA)';
      }
    }

    setEditedData({ ...editedData, profile: updatedProfile });
  };

  const handleSave = () => {
    onSave(editedData);
  };

  return (
    <div className="admin-dashboard glass">
      <div className="admin-header">
        <h2 className="modal-title">{translations.admin.editMode}</h2>
        <div className="admin-controls">
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={isAutoTranslate} 
              onChange={() => setIsAutoTranslate(!isAutoTranslate)} 
            />
            <span className="slider round"></span>
            <span className="toggle-label">{translations.admin.autoTranslate}</span>
          </label>
        </div>
      </div>

      <div className="admin-editor-body">
        <div className="editor-section">
          <h3>Nombre y Contacto</h3>
          <input 
            type="text" 
            value={editedData.name} 
            onChange={(e) => setEditedData({ ...editedData, name: e.target.value })} 
            className="admin-input"
            placeholder="Nombre"
          />
        </div>

        <div className="editor-section">
          <h3>Perfil Profesional (Multilingüe)</h3>
          <div className="multilang-editor">
            <div className="lang-field">
              <span>ES</span>
              <textarea 
                value={editedData.profile.es} 
                onChange={(e) => handleProfileChange('es', e.target.value)}
                className="admin-textarea"
              />
            </div>
            <div className="lang-field">
              <span>CA</span>
              <textarea 
                value={editedData.profile.ca} 
                onChange={(e) => handleProfileChange('ca', e.target.value)}
                className="admin-textarea"
              />
            </div>
            <div className="lang-field">
              <span>EN</span>
              <textarea 
                value={editedData.profile.en} 
                onChange={(e) => handleProfileChange('en', e.target.value)}
                className="admin-textarea"
              />
            </div>
          </div>
        </div>
        
        {/* Simplified for demo - in full version we would map over all experience and projects */}
        <p className="helper-text">Nota: En la versión completa, todos los campos de Experiencia y Proyectos se editan desde aquí de forma similar.</p>
      </div>

      <div className="admin-footer">
        <button className="cta-button secondary" onClick={onCancel}>{translations.admin.cancel}</button>
        <button className="cta-button" onClick={handleSave}>{translations.admin.save}</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
