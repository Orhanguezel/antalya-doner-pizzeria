import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Specials.css';

// Resim dosyalarını import edelim
import pizzaImage from '../assets/home/20.jpg';
import donerImage from '../assets/home/12.jpg';
import saladImage from '../assets/home/2.jpg';

function Specials() {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/menu');
  };

  return (
    <section id="services" className="services">
      <h1>Unsere Spezialitäten</h1>
      <div className="service-container">
        <div className="service" onClick={handleCardClick}>
          <img src={pizzaImage} alt="Pizza" />
          <h3>Pizza</h3>
          <p>Unsere Pizzen werden mit den frischesten Zutaten und viel Liebe zubereitet.</p>
        </div>
        <div className="service" onClick={handleCardClick}>
          <img src={donerImage} alt="Döner" />
          <h3>Döner</h3>
          <p>Genießen Sie unseren köstlichen Döner, perfekt gewürzt und frisch zubereitet.</p>
        </div>
        <div className="service" onClick={handleCardClick}>
          <img src={saladImage} alt="Salat" />
          <h3>Salate</h3>
          <p>Unsere Salate sind frisch und gesund, perfekt als Beilage oder Hauptgericht.</p>
        </div>
      </div>
    </section>
  );
}

export default Specials;
