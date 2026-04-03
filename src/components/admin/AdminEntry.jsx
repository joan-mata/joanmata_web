import React, { useState, useRef } from 'react';

const AdminEntry = ({ onLogin, translations }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [locked, setLocked] = useState(false);
  const attemptsRef = useRef([]);

  // Rate limiting: max 5 attempts per 60 seconds
  const isRateLimited = () => {
    const now = Date.now();
    attemptsRef.current = attemptsRef.current.filter(t => now - t < 60000);
    if (attemptsRef.current.length >= 5) {
      setLocked(true);
      setTimeout(() => setLocked(false), 60000);
      return true;
    }
    attemptsRef.current.push(now);
    return false;
  };

  // SHA-256 hash helper using Web Crypto API
  const sha256 = async (text) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (locked || !password.trim()) return;
    if (isRateLimited()) return;

    try {
      const hashEnv = import.meta.env.VITE_ADMIN_PASSWORD_HASH;
      const plainEnv = import.meta.env.VITE_ADMIN_PASSWORD;
      let authenticated = false;

      if (hashEnv) {
        // Secure mode: compare SHA-256 hashes (password never in bundle)
        const inputHash = await sha256(password);
        authenticated = inputHash === hashEnv;
      } else if (plainEnv) {
        // Legacy fallback: plaintext comparison (to be migrated)
        authenticated = password === plainEnv;
      }

      if (authenticated) {
        onLogin();
      } else {
        setError(true);
        setPassword('');
        setTimeout(() => setError(false), 3000);
      }
    } catch (err) {
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
            autoComplete="off"
            disabled={locked}
          />
          {error && <p className="error-text">{translations.admin.error}</p>}
          {locked && <p className="error-text" style={{ fontSize: '0.8rem' }}>⏳ Demasiados intentos. Espera 60s.</p>}
          <button 
            type="submit" 
            className="cta-button" 
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={locked}
          >
            {translations.admin.login}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminEntry;

