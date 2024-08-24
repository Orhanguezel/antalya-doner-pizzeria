import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import axios from '../axios';

const BlogDetailPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data } = await axios.get(`/blogs/${id}`);
                setBlog(data);
            } catch (error) {
                console.error('Fehler beim Abrufen des Blogs:', error);
            }
        };

        fetchBlog();
    }, [id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/blogs/${id}/comment`, { comment });
            setComment('');
            const { data } = await axios.get(`/blogs/${id}`);
            setBlog(data);
        } catch (error) {
            console.error('Fehler beim Hinzufügen des Kommentars:', error.response ? error.response.data.message : error.message);
        }
    };

    const handleRating = async (rating) => {
        try {
            await axios.post(`/blogs/${id}/rate`, { rating });
            const { data } = await axios.get(`/blogs/${id}`);
            setBlog(data);
        } catch (error) {
            console.error('Fehler beim Bewerten:', error.response ? error.response.data.message : error.message);
        }
    };

    if (!blog) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Card className="blog-card">
                {blog.image && <Card.Img variant="top" src={`http://localhost:5000${blog.image}`} />}
                <Card.Body>
                    <Card.Title className="blogTitle" style={{ textAlign: 'center', fontSize: 'large' }}>
                        {blog.title}
                    </Card.Title>
                    <Card.Text className="blogContent">
                        {blog.content}
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                        <div>
                            {[...Array(5)].map((_, i) => (
                                <span key={i} onClick={() => handleRating(i + 1)}>
                                    {i < blog.averageRating ? <AiFillStar /> : <AiOutlineStar />}
                                </span>
                            ))}
                        </div>
                    </div>
                    <Card.Footer className="d-flex justify-content-between">
                        <Form onSubmit={handleCommentSubmit} className="d-flex">
                            <Form.Control
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Kommentar hinzufügen"
                            />
                            <Button variant="primary" type="submit">
                                Senden
                            </Button>
                        </Form>
                        <div style={{ color: 'blue', fontSize: 'small' }}>
    {blog.author ? blog.author.username : 'Bilinmeyen Yazar'}
</div>


                    </Card.Footer>
                    <div>
                        {blog.comments.map((comment, index) => (
                            <div key={index}>
                                <strong>{comment.username}:</strong> {comment.comment}
                            </div>
                        ))}
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default BlogDetailPage;
