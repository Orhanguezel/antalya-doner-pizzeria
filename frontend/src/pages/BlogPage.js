import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import axios from '../axios';
import './BlogPage.css';

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await axios.get('/blogs');
                setBlogs(data);
            } catch (error) {
                console.error('Fehler beim Abrufen der Blogs:', error);
            }
        };

        fetchBlogs();
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

    return (
        <Container>
            <h2 className="page-title">Blog</h2>
            <Row>
                {blogs.map((blog) => (
                    <Col key={blog._id} sm={12} md={6} lg={4}>
                        <Card className="blog-card">
                            {blog.image && <Card.Img variant="top" src={`http://localhost:5000${blog.image}`} />}
                            <Card.Body>
                                <Card.Title className="blogTitle" style={{ textAlign: 'center', fontSize: 'large' }}>
                                    {blog.title}
                                </Card.Title>
                                <Card.Text className="blogContent" dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 100) }} />
                                <div className="d-flex justify-content-between">
                                    <Button variant="link" onClick={() => handleShowDetailModal(blog)}>Mehr lesen</Button>
                                    <div style={{ color: 'blue', fontSize: 'small' }}>
    {blog.author ? blog.author.username : 'Bilinmeyen Yazar'}
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
                            <img src={`http://localhost:5000${selectedBlog.image}`} alt={selectedBlog.title} style={{ width: '100%' }} />
                            <div dangerouslySetInnerHTML={{ __html: selectedBlog.content }} />
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
        </Container>
    );
};

export default BlogPage;
