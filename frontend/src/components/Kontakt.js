import React from 'react';
import './Kontakt.css';

function Kontakt() {
  return (
    <div className="kontakt-container">
      <h1>Kontakt</h1>
      <p>Hier können Sie uns erreichen.</p>
      <section className="contact-section">
        <div className="kontakt-card">
          <i className="fas fa-phone kontakt-icon"></i>
          <h2 className="contact-title">Lieferservice</h2>
          <a href="tel:024648537" className="contact-phone">02464 85 37</a>
          <p className="contact-p">Kapellenplatz 1, 52457 Aldenhoven</p>
        </div>
        <div className="kontakt-card">
          <i className="fas fa-clock kontakt-icon"></i>
          <h2 className="contact-title">Öffnungszeiten</h2>
          <p className="contact-p">
            Mo. - Fr.: 11:00 bis 22:00<br />
            Sonntag: 16:00 bis 22:00<br />
            Feiertagen: 16:00 bis 22:00
          </p>
        </div>
        <div className="kontakt-card">
          <i className="fas fa-car kontakt-icon"></i>
          <h2 className="contact-title">Lieferzeiten</h2>
          <p className="contact-p">
            Mo. - Fr.: 11:30 bis 21:30<br />
            Sonntag: 16:30 bis 21:30<br />
            Feiertagen: 16:30 bis 21:30
          </p>
        </div>
        <div className="kontakt-card">
          <i className="fas fa-bed kontakt-icon"></i>
          <h2 className="contact-title">SAMSTAG</h2>
          <p className="contact-p">Ruhetag</p>
        </div>
      </section>
      <div className="map-container">
        <iframe
          className="responsive-map"
          title="Kapellenpl. 1, 52457 Aldenhoven, Almanya"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2531.2610589363953!2d6.277949115738342!3d50.90547657954145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bf554d939b2527%3A0xb08e9985ec05cd0d!2sKapellenpl.%201%2C%2052457%20Aldenhoven%2C%20Germany!5e0!3m2!1sen!2str!4v1627475933423!5m2!1sen!2str"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
        <a href="https://www.google.com/maps?q=Kapellenpl.+1,+52457+Aldenhoven,+Germany&hl=en" target="_blank" rel="noopener noreferrer" className="overlay-link">Open in Google Maps</a>
      </div>
    </div>
  );
}

export default Kontakt;
