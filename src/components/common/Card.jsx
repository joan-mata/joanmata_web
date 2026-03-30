import React from 'react';

const Card = ({ title, subtitle, date, children, className = '', onClick }) => {
  const isClickable = !!onClick;

  return (
    <div 
      className={`card ${className} ${isClickable ? 'clickable-card' : ''}`}
      onClick={onClick}
    >
      <div className="card-header">
        <div>
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
        {date && <span className="card-date">{date}</span>}
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

export default Card;
