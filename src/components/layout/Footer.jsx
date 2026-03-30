import React from 'react';

const Footer = ({ name, email, onAdminClick }) => {
  return (
    <footer className="footer section-top-divider">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} {name}</p>
        <div className="footer-links">
          <a href={`mailto:${email}`}>{email}</a>
          <button className="admin-link-btn" onClick={onAdminClick}>
            Admin Portal
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
