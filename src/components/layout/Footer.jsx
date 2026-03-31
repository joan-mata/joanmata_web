import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ name, email }) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} {name}</p>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '1rem' }}>
          <a href={`mailto:${email}`} className="btn-premium">{email}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
