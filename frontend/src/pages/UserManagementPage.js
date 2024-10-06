import React, { useState, useEffect } from 'react';
import axios from '../axios'; // axios'u doğru bir şekilde bağladığınızdan emin olun
import { Button, Container, Form } from 'react-bootstrap';
import defaultProfileImage from '../assets/uploads/defaultProfileImage.png'; // Default profil resmi
import './UserManagementPage.css';

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [editUserId, setEditUserId] = useState(null);
    const [role, setRole] = useState('');
    const [blocked, setBlocked] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(defaultProfileImage);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Sunucudan tüm kullanıcıları çek
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await axios.get('/users', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUsers(data); // Kullanıcıları local state'e kaydet
            } catch (error) {
                setErrorMessage('Benutzer konnten nicht abgerufen werden.');
                console.error('Fehler beim Abrufen der Benutzer:', error.message);
            }
        };
        fetchUsers();
    }, []);

    // Kullanıcıyı düzenlemek için hazırlık yap
    const handleEdit = (user) => {
        setEditUserId(user._id);
        setRole(user.role);
        setBlocked(user.blocked);
        setPhoneNumber(user.phoneNumber || '');
        setAddress(user.address || '');
        setProfileImage(null); // Fotoğraf yüklemesi için boş bırak
        setPhotoPreview(user.profileImage ? user.profileImage : defaultProfileImage);
    };

    // Kullanıcı verilerini kaydet
    const handleSaveChanges = async () => {
        const formData = new FormData();
        formData.append('role', role);
        formData.append('blocked', blocked);
        formData.append('phoneNumber', phoneNumber);
        formData.append('address', address);
        if (profileImage) {
            formData.append('profileImage', profileImage);
        }
    
        try {
            // Sunucuya PUT isteği yaparak kullanıcıyı güncelle
            const response = await axios.put(`/users/${editUserId}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            const updatedUsers = users.map(user =>
                user._id === editUserId
                    ? { ...user, role, blocked, phoneNumber, address, profileImage: response.data.profileImage }
                    : user
            );
            setUsers(updatedUsers); // Güncellenmiş kullanıcıyı state'e kaydet
            setEditUserId(null);
            setSuccessMessage('Änderungen erfolgreich gespeichert.');
        } catch (error) {
            setErrorMessage('Fehler beim Speichern der Änderungen.');
            console.error('Fehler beim Aktualisieren des Benutzers:', error.message);
        }
    };
    

    // Düzenlemeyi iptal et
    const handleCancelEdit = () => {
        setEditUserId(null);
        setErrorMessage('');
        setSuccessMessage('');
    };

    // Kullanıcıyı sil
    const handleDelete = async (userId) => {
        try {
            await axios.delete(`/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            // Silinen kullanıcıyı state'ten kaldır
            setUsers(users.filter(user => user._id !== userId));
            setSuccessMessage('Benutzer erfolgreich gelöscht.');
        } catch (error) {
            setErrorMessage('Fehler beim Löschen des Benutzers.');
            console.error('Fehler beim Löschen des Benutzers:', error.message);
        }
    };

    // Profil resmini güncellemek için dosya seç
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setPhotoPreview(URL.createObjectURL(file)); // Seçilen dosyanın önizlemesini göster
        }
    };

    return (
        <Container className="benutzerverwaltung-container">
            <h3>Benutzerverwaltung</h3>
            <p>Verwalten Sie alle registrierten Benutzer hier.</p>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            {users.length > 0 ? (
                users.map(user => (
                    <div key={user._id} className="user-info-container">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Benutzername</td>
                                    <td>{user.username}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <td>Rolle</td>
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
                                    <td>Blockiert</td>
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
                                    <td>Telefonnummer</td>
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
                                    <td>Adresse</td>
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
                                    <td>Foto</td>
                                    <td>
                                        <div className="user-photo">
                                            <img
                                                src={photoPreview}
                                                alt="Benutzer Foto"
                                                className="profile-image-preview"
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
                                                <Button variant="secondary" onClick={handleCancelEdit} style={{ marginLeft: '10px' }}>Abbrechen</Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button variant="warning" onClick={() => handleEdit(user)}>Bearbeiten</Button>
                                                <Button variant="danger" onClick={() => handleDelete(user._id)} style={{ marginLeft: '10px' }}>Löschen</Button>
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
