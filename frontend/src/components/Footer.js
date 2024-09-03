import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import './Footer.css';
import logo from '../assets/logo/11.png';

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4} sm={12} className="footer-col text-center text-md-left">
            <img
              src={logo}
              alt="Guezel Webdesign Logo"
              className="footer-logo mb-3"
            />
            <h5>ANTALYA Döner & Pizzeria</h5>
            <p>Kapellenplatz 1, 52457 Aldenhoven</p>
          </Col>
          <Col md={4} sm={12} className="footer-col text-center">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li><a href="/">Home</a></li>
              <li><a href="/menu">Menü</a></li>
              <li><a href="/warenkorb">Warenkorb</a></li>
              <li><a href="/kontakt">Kontakt</a></li>
              <li><a href="/profile">Profile</a></li>
              <li><a href="/auth">Login/Register</a></li>
            </ul>
          </Col>
          <Col md={4} sm={12} className="footer-col text-center text-md-right">
            <h5>Social Media</h5>
            <ul className="list-unstyled">
              <li><FaFacebook className="footer-icon" /> <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><FaInstagram className="footer-icon" /> <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </Col>
        </Row>
        <Row className="footer-bottom mt-4">
          <Col sm={12} className="text-center">
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
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
