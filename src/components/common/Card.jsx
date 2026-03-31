import React from 'react';

const Card = ({ title, subtitle, date, children, className = '', onClick, links, translations }) => {
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
          {links?.live && (
            <a 
              href={`https://${links.live}`} 
              target="_blank" 
              rel="noreferrer" 
              className="card-action-btn"
              onClick={(e) => e.stopPropagation()}
            >
              {translations?.projects?.visit?.toUpperCase() || 'VISITAR WEB'}
            </a>
          )}
          {date && <span className="card-date">{date}</span>}
        </div>
      </div>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default Card;
