import React, { useState, useEffect } from 'react';
import axios from '../axios'; // Axios'u doğru yapılandırdığınızdan emin olun
import { Table, Button, Container, Modal, Form } from 'react-bootstrap';
import './UserManagementPage.css';  // Stil dosyasını dahil ediyoruz

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
                const { data } = await axios.get('/users'); // API endpoint'i gerektiği gibi ayarlayın
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Fehler beim Abrufen der Benutzer.'); // "Error fetching users."
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
            await axios.delete(`/users/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('Fehler beim Löschen des Benutzers.'); // "Error deleting user."
        }
    };

    const handleSaveChanges = async () => {
        try {
            await axios.put(`/users/${currentUser._id}`, {
                username,
                email,
                role
            });
            setUsers(users.map(user => user._id === currentUser._id ? { ...user, username, email, role } : user));
            setShowEditModal(false);
        } catch (error) {
            console.error('Error updating user:', error);
            setError('Fehler beim Aktualisieren des Benutzers.'); // "Error updating user."
        }
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
    };

    return (
        <Container>
            <h1>Benutzerverwaltung</h1> {/* "User Management" */}
            <p>Verwalten Sie hier alle registrierten Benutzer.</p> {/* "Manage all registered users here." */}
            {error && <p className="error-message">{error}</p>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Benutzername</th> {/* Username */}
                        <th>Email</th>
                        <th>Rolle</th> {/* Role */}
                        <th>Aktionen</th> {/* Actions */}
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(user)}>Bearbeiten</Button> {/* Edit */}
                                <Button variant="danger" onClick={() => handleDelete(user._id)}>Löschen</Button> {/* Delete */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Kullanıcı düzenleme için modal */}
            <Modal show={showEditModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Benutzer bearbeiten</Modal.Title> {/* Edit User */}
                </Modal.Header>
                <Modal.Body>
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
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Schließen {/* Close */}
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Änderungen speichern {/* Save Changes */}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default UserManagementPage;
