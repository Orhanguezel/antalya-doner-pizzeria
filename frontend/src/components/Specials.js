import React from 'react';
import './Specials.css';

const specials = [
  { image: '../assets/home/20.jpg', title: 'Pizza', description: 'Unsere Pizzen werden mit den frischesten Zutaten und viel Liebe zubereitet.' },
  { image: '../assets/home/12.jpg', title: 'Döner', description: 'Genießen Sie unseren köstlichen Döner, perfekt gewürzt und frisch zubereitet.' },
  { image: '../assets/home/2.jpg', title: 'Salate', description: 'Unsere Salate sind frisch und gesund, perfekt als Beilage oder Hauptgericht.' },
];

function Specials() {
  return (
    <section id="specials" className="specials-section">
      <h2>Unsere Spezialitäten</h2>
      <div className="specials-container">
        {specials.map((special, index) => (
          <div className="special-card" key={index}>
            <img src={special.image} alt={special.title} />
            <h3>{special.title}</h3>
            <p>{special.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Specials;
