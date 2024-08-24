import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from '../axios';

const BlogForm = ({ blog, onSave }) => {
    const [title, setTitle] = useState(blog ? blog.title : '');
    const [content, setContent] = useState(blog ? blog.content : '');
    const [summary, setSummary] = useState(blog ? blog.summary : '');
    const [category, setCategory] = useState(blog ? blog.category : '');

    const handleSave = async (e) => {
        e.preventDefault();
        const newBlog = { title, content, summary, category };
        onSave(newBlog);
    };

    return (
        <Form onSubmit={handleSave}>
            <Form.Group controlId="title">
                <Form.Label>Başlık</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Başlık girin"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="summary">
                <Form.Label>Özet</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Özet girin"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="category">
                <Form.Label>Kategori</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Kategori girin"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="content">
                <Form.Label>İçerik</Form.Label>
                <ReactQuill value={content} onChange={setContent} />
            </Form.Group>
            <Button variant="primary" type="submit">Kaydet</Button>
        </Form>
    );
};

export default BlogForm;
