import React from "react";
import logo from '../assets/logo/1.png';  // Import the logo correctly
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="footer-content">
        <div className="foot-left">
          <h2 className="foot-title">ANTALYA Döner & Pizzeria</h2>
          <p className="foot-p">Kapellenplatz 1, 52457 Aldenhoven</p>
        </div>
        <div className="foot-right">
          <div className="social">
            <a
              href="https://www.facebook.com/profile.php?id=100063527353789"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://www.instagram.com/antalya_doner_pizzeria/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
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
        <p>Diese Website befindet sich in der Testphase und wird regelmäßig aktualisiert.</p>
        <p>© Copyright - All Rights Reserved to ANTALYA Döner & Pizzeria</p>
        <p className="footer-design">
          <button
            onClick={() =>
              window.open("https://www.guezelwebdesign.com", "_blank")
            }
          >
            Designed by OG
          </button>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
