import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaEnvelope, FaLinkedin, FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa';
import './Footer.css';
import logo from '../assets/web-Logo.png';

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4} className="footer-col">
            <img
              src={logo}
              alt="Guezel Webdesign Logo"
              className="footer-logo"
            />
            <h5>Guezel Webdesign</h5>
            <p>Ihr Partner für professionelle Webentwicklung und Design.</p>
          </Col>
          <Col md={4} className="footer-col">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li><a href="/">Startseite</a></li>
              <li><a href="/projects">Projekte</a></li>
              <li><a href="/contact">Kontakt</a></li>
              <li><a href="/about">Über mich</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/auth">Login/Register</a></li>
            </ul>
          </Col>
          <Col md={4} className="footer-col">
            <h5>Kontakt</h5>
            <ul className="list-unstyled">
              <li><FaEnvelope /> orhanguzell@gmail.com</li>
              <li><FaLinkedin /> <a href="https://www.linkedin.com/in/orhan-güzel-53b47b11a" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><FaGithub /> <a href="https://github.com/Orhanguezel" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><FaFacebook /> <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><FaInstagram /> <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </Col>
        </Row>
        <div className="text-center mt-4">
          <span className="text-muted">&copy; 2024 Guezel Webdesign Alle Rechte vorbehalten.</span>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
