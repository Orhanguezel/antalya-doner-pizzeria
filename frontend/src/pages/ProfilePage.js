import React, { useEffect, useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import axios from '../axios';
import './ProfilePage.css';
import placeholderImage from '../assets/defaultProfileImage.png'; // Placeholder resmi ekleyin

const ProfilePage = ({ userInfo }) => {
    const [profileData, setProfileData] = useState({
        username: '',
        email: '',
        address: '', // Adres ekledik
        password: '',
        profileImage: placeholderImage, // Varsayılan profil fotoğrafı olarak placeholder
    });
    const [loading, setLoading] = useState(true);
    const [updateMessage, setUpdateMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            if (!userInfo?.token) {
                setLoading(false);
                setUpdateMessage('Auf die Benutzerinformationen kann nicht zugegriffen werden.');
                return;
            }

            try {
                const response = await axios.get(`/api/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                });

                const data = response.data;
                console.log('Profil Daten:', data);
                setProfileData({
                    username: data.username,
                    email: data.email,
                    address: data.address || '', // Adres bilgisi
                    password: '',
                    profileImage: data.profileImage || placeholderImage, // Eğer kullanıcı fotoğrafı varsa göster, yoksa placeholder
                });
            } catch (error) {
                console.error('Fehler beim Laden der Profilinformationen:', error.message);
                setUpdateMessage('Profilinformationen konnten nicht geladen werden.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [userInfo?.token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setProfileData((prevState) => ({
            ...prevState,
            profileImage: URL.createObjectURL(e.target.files[0]), // Profil fotoğrafı için URL oluşturuyoruz
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', profileData.username);
        formData.append('email', profileData.email);
        formData.append('address', profileData.address); // Adres formdata'ya eklenir
        if (profileData.password) formData.append('password', profileData.password);
        if (profileData.profileImage !== placeholderImage) formData.append('profileImage', profileData.profileImage);

        try {
            const response = await axios.put(
                `/api/users/profile`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            setUpdateMessage('Profil erfolgreich aktualisiert.');
            setProfileData({
                ...profileData,
                password: '',
            });
        } catch (error) {
            console.error('Fehler beim Aktualisieren des Profils:', error.message);
            setUpdateMessage('Fehler beim Aktualisieren des Profils.');
        }
    };

    const handleCancel = () => {
        setProfileData((prevState) => ({
            ...prevState,
            password: '',
            profileImage: prevState.profileImage === placeholderImage ? '' : prevState.profileImage, // Eğer placeholder ise boş bırak
        }));
    };

    if (loading) {
        return <p className="loading-message">Profilinformationen werden geladen...</p>;
    }

    return (
        <Container className="mt-4 profile-page">
            <h2>Profil</h2>
            {updateMessage && <p className="update-message">{updateMessage}</p>}
            <Card>
                <Card.Body>
                    <Card.Title>Benutzerinformationen</Card.Title>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Benutzername</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={profileData.username}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={profileData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formAddress">
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={profileData.address}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Passwort</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={profileData.password}
                                onChange={handleInputChange}
                                placeholder="Neues Passwort (optional)"
                            />
                        </Form.Group>

                        <Form.Group controlId="formProfileImage">
                            <Form.Label>Profil Foto</Form.Label>
                            <div className="text-center">
                                <img 
                                    src={profileData.profileImage} 
                                    alt="Profilbild" 
                                    className="profile-image" 
                                />
                            </div>
                            <Form.Control
                                type="file"
                                onChange={handleFileChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Aktualisieren
                        </Button>
                        <Button variant="secondary" onClick={handleCancel} style={{ marginLeft: '10px' }}>
                            Abbrechen
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProfilePage;