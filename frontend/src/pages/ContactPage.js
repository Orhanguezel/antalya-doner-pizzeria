import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';
import axios from '../axios';
import './ContactPage.css';

function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        description: ''
    });

    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/contact', formData);
            if (response.status === 200) {
                setResponseMessage('Form successfully submitted');
            } else {
                setResponseMessage('Failed to submit the form');
            }
        } catch (error) {
            console.error('There was an error submitting the form:', error);
            setResponseMessage('An error occurred. Please try again later.');
        }
    };
    
    
    

    return (
        <Container className="contact-page">
            <h2 className="text-center mb-4">Erzählen Sie uns von Ihrem Projekt!</h2>
            <p className="text-center mb-5">
                Wir werden uns mit Ihnen in Verbindung setzen, um ein Meeting zu planen und Ihre Ziele zu besprechen.
            </p>
            <Row>
                <Col md={6}>
                    <Form className="contact-form" onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name, Nachname</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Geben Sie Ihren Namen ein"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Geben Sie Ihre Email-Adresse ein"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="phone">
                            <Form.Label>Telefon</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Geben Sie Ihre Telefonnummer ein"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Beschreibung</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Beschreiben Sie Ihr Projekt"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </Form.Group>

                           {/* Butonu disabled yapıyoruz */}
                           <Button variant="primary" type="submit" className="mt-3" disabled>
                            Anfrage senden 
                        </Button>
                    </Form>
                    {responseMessage && <p className="mt-3">{responseMessage}</p>}
                </Col>
                <Col md={6}>
                    <div className="contact-info">
                        <h4>Kontakt Informationen</h4>
                        <p><FaEnvelope /> orhanguzell@gmail.com</p>
                        <p><FaPhone /> 0172 384 6068</p>
                        <ul className="social-links">
                            <li>
                                <a href="https://www.linkedin.com/in/orhan-güzel-53b47b11a" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin /> LinkedIn
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/Orhanguezel" target="_blank" rel="noopener noreferrer">
                                    <FaGithub /> GitHub
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                    <FaFacebook /> Facebook
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram /> Instagram
                                </a>
                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ContactPage;
