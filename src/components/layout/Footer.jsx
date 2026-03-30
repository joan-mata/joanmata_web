import React from 'react';

const Footer = ({ name, email }) => {
  return (
    <footer className="footer">
      <p>&copy; 2026 {name}. Built with React & Vite.</p>
      <p style={{ marginTop: '0.5rem' }}>Barcelona • {email}</p>
    </footer>
  );
};

export default Footer;
