import React from 'react';

const Badge = ({ text, className = '' }) => {
  return (
    <span className={`badge ${className}`}>
      {text}
    </span>
  );
};

export default Badge;
