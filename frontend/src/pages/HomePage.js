import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './HomePage.css';

const HomePage = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className="hero">
                <Container>
                    <Row className="justify-content-md-center text-center">
                        <Col md="auto">
                            <Button variant="primary" href="#projects-section" className="mt-3 hero-btn">
                                Unsere Projekte ansehen
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Footer */}
            <footer className="footer mt-auto py-3 bg-light">
                <Container>
                    <Row>
                        <Col className="text-center">
                            <span className="text-muted">© 2024 Guezel Webdesign. Alle Rechte vorbehalten.</span>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
};

export default HomePage;
