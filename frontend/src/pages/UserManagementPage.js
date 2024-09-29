import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { Button, Container, Form } from 'react-bootstrap';
import defaultProfileImage from '../assets/defaultProfileImage.png';
import './UserManagementPage.css';

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [editUserId, setEditUserId] = useState(null);
    const [role, setRole] = useState('');
    const [blocked, setBlocked] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [photo, setPhoto] = useState(null);

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
                console.error('Fehler beim Abrufen der Benutzer:', error.message);
            }
        };
        fetchUsers();
    }, []);

    const handleEdit = (user) => {
        setEditUserId(user._id);
        setRole(user.role);
        setBlocked(user.blocked);
        setPhoneNumber(user.phoneNumber || '');
        setAddress(user.address || '');
        setPhoto(null);
    };

    const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append('role', role);  // Rol değişikliğini ekliyoruz
    formData.append('blocked', blocked);
    formData.append('phoneNumber', phoneNumber);
    formData.append('address', address);
    if (photo) {
        formData.append('photo', photo);
    }

    try {
        const response = await axios.put(`/users/${editUserId}/role`, { role }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'  // application/json olduğundan emin olalım
            }
        });
        
        const updatedUsers = users.map(user =>
            user._id === editUserId
                ? { ...user, role }
                : user
        );
        setUsers(updatedUsers);
        setEditUserId(null);
    } catch (error) {
        console.error('Fehler beim Aktualisieren der Benutzerrolle:', error.message);
    }
};


    const handleCancelEdit = () => {
        setEditUserId(null);
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            // Kullanıcı state'ten kaldırılıyor
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Fehler beim Löschen des Benutzers:', error.message);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
        }
    };

    return (
        <Container className="benutzerverwaltung-container">
            <h3>Benutzerverwaltung</h3>
            <p>Verwalten Sie alle registrierten Benutzer hier.</p>
            {users.length > 0 ? (
                users.map(user => (
                    <div key={user._id} className="user-info-container">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td data-label="Benutzername">Benutzername</td>
                                    <td>{user.username}</td>
                                </tr>
                                <tr>
                                    <td data-label="Email">Email</td>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <td data-label="Rolle">Rolle</td>
                                    <td>
                                        {editUserId === user._id ? (
                                            <Form.Control
                                                as="select"
                                                value={role}
                                                onChange={(e) => setRole(e.target.value)}
                                            >
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                            </Form.Control>
                                        ) : (
                                            user.role
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td data-label="Blockiert">Blockiert</td>
                                    <td>
                                        {editUserId === user._id ? (
                                            <Form.Check
                                                type="checkbox"
                                                checked={blocked}
                                                onChange={(e) => setBlocked(e.target.checked)}
                                                label="Blockiert"
                                            />
                                        ) : (
                                            user.blocked ? "Ja" : "Nein"
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td data-label="Telefonnummer">Telefonnummer</td>
                                    <td>
                                        {editUserId === user._id ? (
                                            <Form.Control
                                                type="text"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                            />
                                        ) : (
                                            user.phoneNumber || "N/A"
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td data-label="Adresse">Adresse</td>
                                    <td>
                                        {editUserId === user._id ? (
                                            <Form.Control
                                                type="text"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                        ) : (
                                            user.address || "N/A"
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td data-label="Foto">Foto</td>
                                    <td>
                                        <div className="user-photo">
                                            <img
                                                src={user.photo ? user.photo : defaultProfileImage}
                                                alt="Benutzer Foto"
                                            />
                                            {editUserId === user._id && (
                                                <Form.Group controlId="formFile">
                                                    <Form.Label>Foto ändern</Form.Label>
                                                    <Form.Control type="file" onChange={handleFileChange} />
                                                </Form.Group>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        {editUserId === user._id ? (
                                            <>
                                                <Button variant="primary" onClick={handleSaveChanges}>Speichern</Button>
                                                <Button variant="secondary" onClick={handleCancelEdit}>Abbrechen</Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button variant="warning" onClick={() => handleEdit(user)}>Bearbeiten</Button>
                                                <Button variant="danger" onClick={() => handleDelete(user._id)}>Löschen</Button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))
            ) : (
                <p className="text-center">Keine Benutzer gefunden.</p>
            )}
        </Container>
    );
};

export default UserManagementPage;
