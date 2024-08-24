import React, { useState, useEffect } from 'react';
import axios from '../axios'; // Ensure axios is configured correctly
import { Table, Button, Container } from 'react-bootstrap';
import './UserManagementPage.css';  // Stil dosyasını dahil ediyoruz

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await axios.get('/users'); // Adjust the API endpoint as needed
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Fehler beim Abrufen der Benutzer.'); // German for "Error fetching users."
            }
        };

        fetchUsers();
    }, []);

    const handleEdit = (userId) => {
        // Düzenleme işlevini burada ekleyin
        console.log(`Bearbeiten des Benutzers mit ID: ${userId}`); // German for "Editing user with ID:"
    };

    const handleDelete = (userId) => {
        // Silme işlevini burada ekleyin
        console.log(`Löschen des Benutzers mit ID: ${userId}`); // German for "Deleting user with ID:"
    };

    return (
        <Container>
            <h1>Benutzerverwaltung</h1> {/* German for "User Management" */}
            <p>Verwalten Sie hier alle registrierten Benutzer.</p> {/* German for "Manage all registered users here." */}
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
                                <Button variant="warning" onClick={() => handleEdit(user._id)}>Bearbeiten</Button> {/* Edit */}
                                <Button variant="danger" onClick={() => handleDelete(user._id)}>Löschen</Button> {/* Delete */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default UserManagementPage;
