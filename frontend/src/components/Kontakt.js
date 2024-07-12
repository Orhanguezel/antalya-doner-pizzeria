import React from 'react';
import './Kontakt.css';

function Kontakt() {
  return (
    <div className="kontakt-container">
      <h1>Kontakt</h1>
      <p>Hier können Sie uns erreichen.</p>
      <section className="contact-section">
        <div className="card">
          <i className="fas fa-phone icon-contact"></i>
          <h2 className="contact-title">Lieferservice</h2>
          <h2 className="contact-title">02464 85 37</h2>
          <p className="contact-p">Kapellenplatz 1, 52457 Aldenhoven</p>
        </div>
        <div className="card">
          <i className="fas fa-clock icon-contact"></i>
          <h2 className="contact-title">Öffnungszeiten</h2>
          <p className="contact-p">
            Mo. - Fr.: 11:00 bis 22:00<br />
            Sonntag: 16:00 bis 22:00<br />
            Feiertagen: 16:00 bis 22:00
          </p>
          <i className="fas fa-car icon-contact"></i>
          <h2 className="contact-title">Lieferzeiten</h2>
          <p className="contact-p">
            Mo. - Fr.: 11:30 bis 21:30<br />
            Sonntag: 16:30 bis 21:30<br />
            Feiertagen: 16:30 bis 21:30
          </p>
          <i className="fas fa-bed icon-contact"></i>
          <h2 className="contact-title">SAMSTAG</h2>
          <p className="contact-p">Ruhetag</p>
        </div>
      </section>
      <iframe
        title="Antalya Döner & Pizzeria Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0192586249363!2d144.96315761531695!3d-37.8141079797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d1e5e4f4e345!2sAntalya%20D%C3%B6ner%20%26%20Pizzeria!5e0!3m2!1sen!2sus!4v1611223337356!5m2!1sen!2sus"
        width="600"
        height="450"
        allowFullScreen=""
        loading="lazy"
        style={{ border: 0 }}
      ></iframe>
    </div>
  );
}

export default Kontakt;
