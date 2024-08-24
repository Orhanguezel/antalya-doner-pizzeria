import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Table } from 'react-bootstrap';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const AdminProfilePage = ({ userInfo }) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [profileData, setProfileData] = useState({});
    const [profileImage, setProfileImage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get('/users/profile');
                setProfileData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setLoading(false);
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

        fetchProfile();
        fetchUsers();
    }, []);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', profileData.username);
        formData.append('email', profileData.email);
        if (profileImage) {
            formData.append('profileImage', profileImage);
        }

        try {
            const { data } = await axios.put('/users/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setProfileData(data);
            alert('Profil güncellendi');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Profil güncellenemedi');
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

    const handleRoleChange = async (userId, newRole) => {
        try {
            await axios.put(`/users/${userId}/role`, { role: newRole });
            setUsers(users.map(user => user._id === userId ? { ...user, role: newRole } : user));
        } catch (error) {
            console.error('Error changing user role:', error);
        }
    };

    if (loading) {
        return <p>Yükleniyor...</p>;
    }

    return (
        <Container className="admin-profile-page">
            <h1>Admin Profil Sayfası</h1>
            <Card className="admin-info-card">
                <Card.Body>
                    <Card.Title>Admin Bilgileri</Card.Title>
                    <Card.Text>
                        <strong>Kullanıcı Adı:</strong> {profileData.username}
                    </Card.Text>
                    <Card.Text>
                        <strong>Email:</strong> {profileData.email}
                    </Card.Text>
                    <Form onSubmit={handleProfileUpdate}>
                        <Form.Group>
                            <Form.Label>Kullanıcı Adı</Form.Label>
                            <Form.Control
                                type="text"
                                value={profileData.username}
                                onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={profileData.email}
                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Profil Resmi</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => setProfileImage(e.target.files[0])}
                            />
                        </Form.Group>
                        <Button type="submit">Profili Güncelle</Button>
                    </Form>
                </Card.Body>
            </Card>

            <h2>Kullanıcı Yönetimi</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Kullanıcı Adı</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <Form.Select 
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </Form.Select>
                            </td>
                            <td>
                                <Button variant="danger" onClick={() => handleDeleteUser(user._id)}>
                                    Kullanıcıyı Sil
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default AdminProfilePage;
