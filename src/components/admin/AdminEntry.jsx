import React, { useState } from 'react';

const AdminEntry = ({ onLogin, translations }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would be a server-side check.
    // For this local/static-ish site, we use VITE_ADMIN_PASSWORD from .env
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="admin-login-overlay">
      <div className="admin-login-card glass">
        <h2 className="modal-title">{translations.admin.title}</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="password" 
            className={`admin-input ${error ? 'error' : ''}`}
            placeholder={translations.admin.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-text">{translations.admin.error}</p>}
          <button type="submit" className="cta-button" style={{ width: '100%', marginTop: '1rem' }}>
            {translations.admin.login}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminEntry;
