import React from 'react';

const Header = ({ translations, activeTab, onTabChange }) => {
  return (
    <header className="premium-nav">
      <div className="logo" onClick={() => onTabChange('experience')}>JOAN MATA</div>
      <nav>
        <ul>
          {Object.keys(translations.nav).map(key => (
            <li 
              key={key} 
              className={activeTab === key ? 'active' : ''} 
              onClick={() => onTabChange(key)}
            >
              {translations.nav[key]}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
