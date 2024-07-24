import React from 'react';
import './Hero.css';

function Hero() {
  const backgroundImage = process.env.PUBLIC_URL + '/assets/bg/dukkan.jpg';

  return (
    <section 
      className="hero" 
      style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="hero-content">
        <h1>Willkommen bei Antalya Döner & Pizzeria</h1>
        <p>Genießen Sie die besten Speisen in der Stadt</p>
        <a href="/menu" className="cta-button">Speisekarte ansehen</a>
      </div>
    </section>
  );
}

export default Hero;
