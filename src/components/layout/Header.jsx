import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ translations, isAdmin, onLogout, currentData }) => {
  return (
    <header className="premium-nav">
      <div className="logo" onClick={() => window.location.hash = '#/'}>
        JOAN MATA
      </div>
      <nav>
        <ul style={{ display: 'flex', listStyle: 'none', gap: '0.75rem' }}>
          {Object.keys(translations.nav).map(key => (
            <li key={key}>
              <NavLink 
                to={key === 'home' ? '/' : `/${key}`}
                className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
              >
                {translations.nav[key].toUpperCase()}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
