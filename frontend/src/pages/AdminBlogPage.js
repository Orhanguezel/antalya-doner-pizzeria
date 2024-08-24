import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Button, Modal, Form, Table } from 'react-bootstrap'; // Table import edildi
import { Link } from 'react-router-dom';
import axios from '../axios'; // Axios import
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const AdminBlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null); // Kullanıcıyı düzenlemek için seçilen kullanıcıyı tutar
    const [showModal, setShowModal] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false); // Kullanıcı düzenleme modalı için
    const [comment, setComment] = useState('');
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [username, setUsername] = useState(''); // Kullanıcı düzenleme için yeni state
    const [email, setEmail] = useState(''); // Kullanıcı düzenleme için yeni state

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await axios.get('/blogs');
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const { data } = await axios.get('/categories');
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const { data } = await axios.get('/users');
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchBlogs();
        fetchCategories();
        fetchUsers();
    }, []);

    const handleCreateBlog = () => {
        setIsEditing(false);
        setShowModal(true);
    };

    const handleEditBlog = (blog) => {
        setIsEditing(true);
        setSelectedBlog(blog);
        setTitle(blog.title);
        setSummary(blog.summary);
        setContent(blog.content);
        setImage(blog.image);
        setCategory(blog.category);
        setShowModal(true);
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('summary', summary);
        formData.append('content', content);
        formData.append('category', category);
        if (image) {
            formData.append('image', image);
        }

        try {
            if (isEditing) {
                await axios.put(`/blogs/${selectedBlog._id}`, formData);
            } else {
                const userLocal = JSON.parse(localStorage.getItem('userInfo'));
                formData.append('author', userLocal._id);
                await axios.post('/blogs', formData);
            }
            setShowModal(false);
            window.location.reload();
        } catch (error) {
            console.error('API call failed:', error.response ? error.response.data.message : error.message);
        }
    };

    const handleCreateCategory = async () => {
        try {
            await axios.post('/categories', { name: categoryName });
            setCategoryName('');
            window.location.reload();
        } catch (error) {
            console.error('Error creating category:', error.response ? error.response.data.message : error.message);
        }
    };

    const handleShowCommentModal = (blog) => {
        setSelectedBlog(blog);
        setShowCommentModal(true);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const userLocal = JSON.parse(localStorage.getItem('userInfo'));
            await axios.post(`/blogs/${selectedBlog._id}/comment`, {
                comment,
                user: userLocal._id,
                username: userLocal.username
            });
            setShowCommentModal(false);
            window.location.reload();
        } catch (error) {
            console.error('API call failed:', error.response ? error.response.data.message : error.message);
        }
    };

    const handleRating = async (blog, rating) => {
        try {
            await axios.put(`/blogs/${blog._id}/rate`, {
                rating
            });
            window.location.reload();
        } catch (error) {
            console.error('Fehler beim Bewerten:', error.response ? error.response.data.message : error.message);
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

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setUsername(user.username);
        setEmail(user.email);
        setShowUserModal(true);
    };

    const handleUserUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/users/${selectedUser._id}`, { username, email });
            setShowUserModal(false);
            window.location.reload();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`/users/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <Container>
            <h2 className="page-title">Yönetici Sayfası</h2>
            
            <Row className="mb-4">
                <Col>
                    <Link to="#blogManagement" className="btn btn-info">Blog Yönetimi</Link>
                </Col>
                <Col>
                    <Link to="#userManagement" className="btn btn-info">Kullanıcı Yönetimi</Link>
                </Col>
            </Row>

            <Row id="blogManagement">
                <Col>
                    <h3>Blog Yönetimi</h3>
                    <Button variant="primary" onClick={handleCreateBlog} className="mb-3">Yeni Blog Oluştur</Button>
                    <Form onSubmit={handleCreateCategory} className="mb-4">
                        <Form.Group controlId="categoryName">
                            <Form.Label>Yeni Kategori Oluştur</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Kategori Adı"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Oluştur</Button>
                    </Form>
                </Col>
            </Row>

            <Row>
                {blogs.map((blog) => (
                    <Col key={blog._id} sm={12} md={6} lg={4}>
                        <Card className="blog-card mb-4">
                            {blog.image && <Card.Img variant="top" src={`http://localhost:5000${blog.image}`} />}
                            <Card.Body>
                                <Card.Title className="blogUser" style={{ color: 'blue', fontSize: 'small' }}>
                                    {blog.author ? blog.author.username : 'Bilinmeyen Yazar'}
                                </Card.Title>
                                <Card.Subtitle className="blogTitle" style={{ textAlign: 'center', fontSize: 'large' }}>
                                    {blog.title}
                                </Card.Subtitle>
                                <Card.Text className="blogContent">
                                    {blog.content.substring(0, 100)}...
                                </Card.Text>
                                <Card.Footer className="d-flex justify-content-between">
                                    <div>
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} onClick={() => handleRating(blog, i + 1)} style={{ cursor: 'pointer' }}>
                                                {i < blog.averageRating ? <AiFillStar /> : <AiOutlineStar />}
                                            </span>
                                        ))}
                                    </div>
                                    <Button variant="link" onClick={() => handleShowCommentModal(blog)}>Yorum Ekle</Button>
                                    <Button variant="link" onClick={() => window.location.href = `/blogs/${blog._id}`}>Mehr lesen</Button>
                                </Card.Footer>
                                <Card.Footer className="d-flex justify-content-between">
                                    <Button variant="link" onClick={() => handleEditBlog(blog)}>Düzenle</Button>
                                    <Button variant="danger" onClick={() => handleDeleteBlog(blog._id)}>Sil</Button>
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row id="userManagement" className="mt-5">
                <Col>
                    <h3>Kullanıcı Yönetimi</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Kullanıcı Adı</th>
                                <th>Email</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Button variant="link" onClick={() => handleEditUser(user)}>Düzenle</Button>
                                        <Button variant="danger" onClick={() => handleDeleteUser(user._id)}>Sil</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Blog Düzenle' : 'Yeni Blog Oluştur'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
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
                            <Form.Label>Kısa Bilgi</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Kısa bilgi girin"
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="content">
                            <Form.Label>İçerik</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="İçeriği girin"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="image">
                            <Form.Label>Resim</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleFileChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="category">
                            <Form.Label>Kategori</Form.Label>
                            <Form.Control
                                as="select"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Kategori seçin</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {isEditing ? 'Güncelle' : 'Oluştur'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showCommentModal} onHide={() => setShowCommentModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Yorum Ekle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCommentSubmit}>
                        <Form.Group controlId="comment">
                            <Form.Label>Yorum</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Yorumunuzu girin"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Gönder</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Kullanıcı Düzenle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUserUpdate}>
                        <Form.Group controlId="username">
                            <Form.Label>Kullanıcı Adı</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Kullanıcı adı girin"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email girin"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Güncelle
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default AdminBlogPage;
