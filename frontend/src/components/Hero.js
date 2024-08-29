import React from 'react';
import './Hero.css';
import backgroundImage from '../assets/bg/dukkan.jpg'; // Arka plan resmini import edin

function Hero() {
  return (
    <section className="hero-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="hero-section-content">
        <h1>Willkommen bei Antalya Döner & Pizzeria</h1>
        <p>Genießen Sie die besten Speisen in Stadt</p>
        <a href="/menu" className="hero-cta-button">Speisekarte ansehen</a>
      </div>
    </section>
  );
}

export default Hero;
