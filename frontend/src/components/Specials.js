import React from 'react';
import './Specials.css';

function Specials() {
  return (
    <section id="services" className="services">
      <h2>Unsere Spezialitäten</h2>
      <div className="service-container">
        <div className="service">
          <img src="../assets/home/20.jpg" alt="Pizza" />
          <h3>Pizza</h3>
          <p>Unsere Pizzen werden mit den frischesten Zutaten und viel Liebe zubereitet.</p>
        </div>
        <div className="service">
          <img src="../assets/home/12.jpg" alt="Döner" />
          <h3>Döner</h3>
          <p>Genießen Sie unseren köstlichen Döner, perfekt gewürzt und frisch zubereitet.</p>
        </div>
        <div className="service">
          <img src="../assets/home/2.jpg" alt="Salat" />
          <h3>Salate</h3>
          <p>Unsere Salate sind frisch und gesund, perfekt als Beilage oder Hauptgericht.</p>
        </div>
      </div>
    </section>
  );
}

export default Specials;
