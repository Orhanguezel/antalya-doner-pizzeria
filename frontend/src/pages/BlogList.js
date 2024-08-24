import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import axios from '../axios';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const { data } = await axios.get('/api/blogs');
            setBlogs(data);
        };
        fetchBlogs();
    }, []);

    return (
        <Container>
            <h2 className="page-title">Blog</h2>
            <Row>
                {blogs.map((blog, index) => (
                    <Col key={index} sm={12} md={6} lg={4}>
                        <Card className="blog-card">
                            <Card.Img variant="top" src="https://via.placeholder.com/150" />
                            <Card.Body>
                                <Card.Title className="card-title">{blog.title}</Card.Title>
                                <Card.Text>{blog.content.substring(0, 100)}...</Card.Text>
                                <Card.Link href={`/blogs/${blog._id}`} target="_blank">Mehr lesen</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default BlogList;
