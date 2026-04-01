import React from 'react';

const Card = ({ title, subtitle, date, children, className = '', onClick, links, translations, footer }) => {
  const isClickable = !!onClick;

  return (
    <div 
      className={`card ${className} ${isClickable ? 'clickable-card' : ''}`}
      onClick={onClick}
    >
      <div className="card-header">
        <div className="header-main-info">
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
        
        <div className="card-header-actions">
          {date && <span className="card-date">{date}</span>}
        </div>
      </div>
      <div className="card-content">
        {children}
      </div>
      {footer && (
        <div className="card-footer-actions">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
