import React from 'react';

const Hero = ({ name, subtitle, profileText }) => {
  const parts = name.split(' ');
  const firstName = parts[0];
  const restOfName = parts.slice(1).join(' ');

  return (
    <section className="hero">
      <h1>{firstName} <span className="gradient-text">{restOfName}</span></h1>
      <p>{subtitle}</p>
      {profileText && <p className="profile-text">{profileText}</p>}
    </section>
  );
};

export default Hero;
