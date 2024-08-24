import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import antalyaImage from '../assets/antalya-logo.png';
import kuhlturmImage from '../assets/kuhlturm-logo.png';
import btuImage from '../assets/btu-logo.png';
import hazerImage from '../assets/hazer-logo.png';

// Named export: Bu, projects dizisinin başka dosyalarda import edilmesine izin verir.
export const projects = [
    { 
        title: 'Antalya Döner Pizzeria', 
        description: 'Eine Website für ein Döner-Restaurant in Deutschland.',
        link: 'https://www.antalya-doner-pizzeria.de',
        image: antalyaImage,
        alt: 'Antalya Döner Pizzeria Website'
    },
    { 
        title: 'Kuhlturm', 
        description: 'Website für ein Kühlunternehmen.',
        link: 'https://kuhlturm.com/',
        image: kuhlturmImage,
        alt: 'Kuhlturm Website'
    },
    { 
        title: 'BTU Holding', 
        description: 'Firmenwebsite für BTU Holding.',
        link: 'https://btuholding.com.tr/',
        image: btuImage,
        alt: 'BTU Holding Website'
    },
    { 
        title: 'Hazer Piliç', 
        description: 'Website für Hazer Piliç, ein Geflügelunternehmen.',
        link: 'https://hazerpilic.com.tr/',
        image: hazerImage,
        alt: 'Hazer Piliç Website'
    }
];

// Default export: Bu, ProjectsPage bileşeninin başka dosyalarda import edilmesine izin verir.
function ProjectsPage() {
    return (
        <Container>
            <h2 className="page-title">Projekte</h2>
            <Row>
                {projects.map((project, index) => (
                    <Col key={index} sm={12} md={6} lg={4}>
                        <Card className="project-card">
                            <Card.Img variant="top" src={project.image} alt={project.alt} loading="lazy" />
                            <Card.Body>
                                <Card.Title className="card-title">{project.title}</Card.Title>
                                <Card.Text>{project.description}</Card.Text>
                                <Card.Link href={project.link} target="_blank">Mehr erfahren</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ProjectsPage;

