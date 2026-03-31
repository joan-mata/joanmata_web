import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ translations, isAdmin, onLogout, currentData }) => {
  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentData, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute("href", dataStr);
    dl.setAttribute("download", "cvData.json");
    dl.click();
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (re) => {
        try {
          localStorage.setItem('curcv_data', re.target.result);
          window.location.reload();
        } catch (err) { alert("Error"); }
      };
      reader.readAsText(file);
    }
  };

  return (
    <header className="container">
      <nav>
        {Object.keys(translations.nav).map(key => (
          <NavLink key={key} to={key === 'home' ? '/' : `/${key}`}>
            {translations.nav[key]}
          </NavLink>
        ))}
      </nav>
      {isAdmin && (
        <div className="admin-toolbar">
          <label className="admin-tool-btn">
            📥 IMPORT JSON
            <input type="file" onChange={importData} style={{display:'none'}}/>
          </label>
          <button onClick={exportData} className="admin-tool-btn">💾 EXPORT JSON</button>
          <button onClick={onLogout} className="admin-tool-btn">✖ EXIT ADMIN</button>
        </div>
      )}
    </header>
  );
};

export default Header;
