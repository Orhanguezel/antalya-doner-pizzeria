import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import axios from '../axios';
import './HomePage.css';
import { projects } from './ProjectsPage';

import phpIcon from '../assets/php.png';
import jsIcon from '../assets/javascript.png';
import nodejsIcon from '../assets/nodejs.png';
import reactIcon from '../assets/react.png';
import vueIcon from '../assets/vue.png';
import angularIcon from '../assets/angular.png';
import mysqlIcon from '../assets/mysql.png';
import redisIcon from '../assets/redis.png';
import pythonIcon from '../assets/python-Logo.png';
import postgresIcon from '../assets/postgresql.png';
import mongodbIcon from '../assets/mongodb.png';
import bootstrapIcon from '../assets/bootstrap.png';
import htmlIcon from '../assets/html.png';
import cssIcon from '../assets/css.png';

const HomePage = () => {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const fetchLastFourBlogs = async () => {
            try {
                const { data } = await axios.get('/blogs/last-four');
                setBlogs(data);
            } catch (error) {
                console.error('Fehler beim Abrufen der Blogs:', error);
            }
        };

        fetchLastFourBlogs();
    }, []);

    const handleShowCommentModal = (blog) => {
        setSelectedBlog(blog);
        setShowCommentModal(true);
    };

    const handleShowDetailModal = (blog) => {
        setSelectedBlog(blog);
        setShowDetailModal(true);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/blogs/${selectedBlog._id}/comment`, {
                comment
            });
            setShowCommentModal(false);
            setComment('');
            window.location.reload();
        } catch (error) {
            console.error('Fehler beim Hinzufügen des Kommentars:', error);
        }
    };

    const handleRating = async (blog, rating) => {
        try {
            await axios.put(`/blogs/${blog._id}/rate`, {
                rating
            });
            window.location.reload();
        } catch (error) {
            console.error('Fehler beim Bewerten:', error);
        }
    };

    const handleDeleteBlog = async (blogId) => {
        try {
            await axios.delete(`/blogs/${blogId}`);
            setBlogs(blogs.filter(blog => blog._id !== blogId));
        } catch (error) {
            console.error('Fehler beim Löschen des Blogs:', error);
        }
    };

    return (
        <div>
            <div className="hero">
                <Container>
                    <Row className="justify-content-md-center text-center">
                        <Col md="auto">
                            <Button variant="primary" href="#projects-section" className="mt-3 hero-btn">Unsere Projekte ansehen</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container className="summary-sections">
                <Row>
                    <Col md={4}>
                        <Card className="text-center summary-card">
                            <Card.Body>
                                <Card.Title>Über mich</Card.Title>
                                <Card.Text>
                                    Erfahren Sie mehr über unser Team und unsere Fähigkeiten.
                                </Card.Text>
                                <Button variant="secondary" href="#about-section">Mehr erfahren</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="text-center summary-card">
                            <Card.Body>
                                <Card.Title>Projekte</Card.Title>
                                <Card.Text>
                                    Entdecken Sie einige unserer erfolgreichen Projekte.
                                </Card.Text>
                                <Button variant="secondary" href="#projects-section">Projekte ansehen</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="text-center summary-card">
                            <Card.Body>
                                <Card.Title>Kontakt</Card.Title>
                                <Card.Text>
                                    Kontaktieren Sie uns für weitere Informationen.
                                </Card.Text>
                                <Button variant="secondary" href="#contact-section">Kontakt aufnehmen</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Container className="blog-section" id="blog-section">
                <h2 className="text-center">Neueste Blogs</h2>
                <Row className="justify-content-center">
                    {blogs.map((blog) => (
                        <Col key={blog._id} className="blog-card-container">
                            <Card className="blog-card">
                                {blog.image && <Card.Img variant="top" src={`http://localhost:5000${blog.image}`} alt={blog.title} loading="lazy" />}
                                <Card.Body>
                                    <Card.Title className="blogTitle" style={{ textAlign: 'center', fontSize: 'large' }}>
                                        {blog.title}
                                    </Card.Title>
                                    <Card.Text className="blogContent">
                                        {blog.content.substring(0, 100)}...
                                    </Card.Text>
                                    <div className="d-flex justify-content-between">
                                        <Button variant="link" onClick={() => handleShowDetailModal(blog)}>Mehr lesen</Button>
                                        <div style={{ color: 'blue', fontSize: 'small' }}>
                                            {blog.author.username}
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <Button variant="link" onClick={() => handleShowCommentModal(blog)}>Kommentar hinzufügen</Button>
                                        <div>
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} onClick={() => handleRating(blog, i + 1)} style={{ cursor: 'pointer' }}>
                                                    {i < blog.averageRating ? '★' : '☆'}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Container className="projects-section" id="projects-section">
                <h2 className="text-center">Unsere Projekte</h2>
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
            <Container className="technology-section" id="contact-section">
                <h2 className="text-center">Unsere Technologien</h2>
                <p className="text-center">
                    Für Ihre Web- oder Mobilanwendung verwenden wir nur moderne und skalierbare Technologien
                </p>
                <Row>
                    <Col md={12}>
                        <h4>Backend</h4>
                        <Row>
                            <Col><img src={phpIcon} alt="PHP" className="tech-icon" loading="lazy" /></Col>
                            <Col><img src={jsIcon} alt="JavaScript" className="tech-icon" loading="lazy" /></Col>
                            <Col><img src={nodejsIcon} alt="Node.js" className="tech-icon" loading="lazy" /></Col>
                            <Col><img src={pythonIcon} alt="Python" className="tech-icon" loading="lazy" /></Col> 
                        </Row>
                    </Col>
                    <Col md={12}>
                        <h4>Framework</h4>
                        <Row>
                            <Col><img src={reactIcon} alt="React" className="tech-icon" loading="lazy" /></Col>
                            <Col><img src={vueIcon} alt="Vue.js" className="tech-icon" loading="lazy" /></Col>
                            <Col><img src={angularIcon} alt="Angular" className="tech-icon" loading="lazy" /></Col>
                            <Col><img src={bootstrapIcon} alt="Bootstrap" className="tech-icon" loading="lazy" /></Col>
                        </Row>
                    </Col>
                    <Col md={12}>
                        <h4>Datenbank</h4>
                        <Row>
                            <Col><img src={mysqlIcon} alt="MySQL" className="tech-icon" loading="lazy" /></Col>
                            <Col><img src={redisIcon} alt="Redis" className="tech-icon" loading="lazy" /></Col>
                            <Col><img src={postgresIcon} alt="PostgreSQL" className="tech-icon" loading="lazy" /></Col>
                            <Col><img src={mongodbIcon} alt="MongoDB" className="tech-icon" loading="lazy" /></Col>
                        </Row>
                    </Col>
                    <Col md={12}>
                        <h4>Web-Technologien</h4>
                        <Row>
                            <Col><img src={htmlIcon} alt="HTML" className="tech-icon" loading="lazy" /></Col>
                            <Col><img src={cssIcon} alt="CSS" className="tech-icon" loading="lazy" /></Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Modal show={showCommentModal} onHide={() => setShowCommentModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Kommentar hinzufügen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCommentSubmit}>
                        <Form.Group controlId="comment">
                            <Form.Label>Kommentar</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Senden
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedBlog?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedBlog && (
                        <>
                            <img src={`http://localhost:5000${selectedBlog.image}`} alt={selectedBlog.title} style={{ width: '100%' }} loading="lazy" />
                            <p>{selectedBlog.content}</p>
                            <div>
                                {selectedBlog.comments.map((comment, index) => (
                                    <div key={index}>
                                        <strong>{comment.username}:</strong> {comment.comment}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default HomePage;
