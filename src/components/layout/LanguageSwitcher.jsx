import React from 'react';

const LanguageSwitcher = ({ lang, onLangChange }) => {
  return (
    <div className="language-switcher">
      {['es', 'ca', 'en'].map((l) => (
        <button 
          key={l}
          className={lang === l ? 'active' : ''} 
          onClick={() => onLangChange(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
