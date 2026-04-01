import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ translations, isAdmin, onLogout, currentData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="premium-nav">
      <div className="logo" onClick={() => { window.location.hash = '#/'; closeMenu(); }}>
        JOAN MATA
      </div>

      <button className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={isMenuOpen ? 'active' : ''}>
        <ul>
          {Object.keys(translations.nav).map(key => {
            let target = `/${key}`;
            if (key === 'home') target = '/';
            if (key === 'experience') target = '/';

            return (
              <li key={key}>
                <NavLink 
                  to={target}
                  className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
                  onClick={closeMenu}
                  end={target === '/'}
                >
                  {translations.nav[key].toUpperCase()}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
