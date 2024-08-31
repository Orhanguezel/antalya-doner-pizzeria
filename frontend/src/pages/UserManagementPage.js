import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { Table, Button, Container, Modal, Form } from 'react-bootstrap';
import './UserManagementPage.css';

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await axios.get('/users', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUsers(data);
            } catch (error) {
                console.error('Fehler beim Abrufen der Benutzer:', error.message, error.response?.data);
                setError('Fehler beim Abrufen der Benutzer.');
            }
        };

        fetchUsers();
    }, []);

    const handleEdit = (user) => {
        setCurrentUser(user);
        setUsername(user.username);
        setEmail(user.email);
        setRole(user.role);
        setShowEditModal(true);
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Fehler beim Löschen des Benutzers:', error.message, error.response?.data);
            setError('Fehler beim Löschen des Benutzers.');
        }
    };

    const handleSaveChanges = async () => {
        try {
            const updatedUser = { username, email, role };
            await axios.put(`/users/${currentUser._id}`, updatedUser, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUsers(users.map(user => user._id === currentUser._id ? { ...user, ...updatedUser } : user));
            setShowEditModal(false);
        } catch (error) {
            console.error('Fehler beim Aktualisieren des Benutzers:', error.message, error.response?.data);
            setError('Fehler beim Aktualisieren des Benutzers.');
        }
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
    };

    return (
        <Container className="user-management-container">
            <h3>Benutzerverwaltung</h3>
            <p>Verwalten Sie hier alle registrierten Benutzer.</p>
            {error && <p className="error-message">{error}</p>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Benutzername</th>
                        <th>Email</th>
                        <th>Rolle</th>
                        <th>Aktionen</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map(user => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <Button variant="warning" onClick={() => handleEdit(user)}>Bearbeiten</Button>
                                    <Button variant="danger" onClick={() => handleDelete(user._id)}>Löschen</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">Keine Benutzer gefunden.</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Modal
    dialogClassName="custom-modal-dialog"
    contentClassName="custom-modal-content"
    show={showEditModal}
    onHide={handleCloseModal}
    centered
>
    <Modal.Header className="custom-modal-header" closeButton>
        <Modal.Title>Benutzer bearbeiten</Modal.Title>
    </Modal.Header>
    <Modal.Body className="custom-modal-body">
        <Form>
            <Form.Group controlId="formUsername">
                <Form.Label>Benutzername</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="formRole">
                <Form.Label>Rolle</Form.Label>
                <Form.Control
                    as="select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </Form.Control>
            </Form.Group>
        </Form>
    </Modal.Body>
    <Modal.Footer className="custom-modal-footer">
        <Button variant="secondary" onClick={handleCloseModal}>
            Schließen
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
            Änderungen speichern
        </Button>
    </Modal.Footer>
</Modal>


        </Container>
    );
};

export default UserManagementPage;
