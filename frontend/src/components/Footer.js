import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="navbar-logo">
        <img src="/img/logo/2.png" alt="Logo" />
      </div>
      <h2 className="foot-title margin-top">ANTALYA Döner & Pizzeria</h2>
      <p className="foot-p">Kapellenplatz 1, 52457 Aldenhoven</p>
      <div className="social">
        <a
          className='foot-terms-link'
          href="https://www.facebook.com/profile.php?id=100063527353789"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-facebook"></i>
        </a>
        <a
          className='foot-terms-link'
          href="https://www.instagram.com/antalya_doner_pizzeria/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-instagram"></i>
        </a>
      </div>
      <p className="foot-terms">
        <a
          className="foot-terms-link"
          href="https://policies.google.com/privacy?hl=en-US"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy & Terms
        </a>
      </p>
      <p className="copyright">© Copyright - All Rights Reserved to ANTALYA Döner & Pizzeria</p>
      <p><button className="foot-terms-link" style={{ background: 'none', border: 'none', color: 'inherit', padding: 0, cursor: 'pointer' }}>Designed by OG</button></p>
    </footer>
  );
};

export default Footer;
