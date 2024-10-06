import React, { useEffect, useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import axios from '../axios';
import './ProfilePage.css';
import { useAuth } from '../context/AuthContext';
import placeholderImage from '../assets/uploads/defaultProfileImage.png'; // Default profil resmi

const ProfilePage = () => {
    const { userInfo, token, logout } = useAuth();
    const [profileData, setProfileData] = useState({
        username: userInfo?.username || '',
        email: userInfo?.email || '',
        address: '',
        phoneNumber: '',
        password: '',
        profileImage: placeholderImage,
        profileImageFile: null,
    });
    const [loading, setLoading] = useState(true);
    const [updateMessage, setUpdateMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) {
                setLoading(false);
                setUpdateMessage('Auf die Benutzerinformationen kann nicht zugegriffen werden.');
                return;
            }
    
            try {
                const response = await axios.get(`/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                console.log("API'den Gelen Profil Verisi:", response.data); // Gelen veriyi kontrol edin
                const data = response.data;
                setProfileData({
                    username: data.username,
                    email: data.email,
                    address: data.address || '',      // Adres bilgisi varsa güncelle
                    phoneNumber: data.phoneNumber || '',  // Telefon numarası varsa güncelle
                    password: '',
                    profileImage: data.profileImage ? `/uploads/profiles/${data.profileImage}` : placeholderImage,
                    profileImageFile: null,
                });
            } catch (error) {
                console.error('Fehler beim Laden der Profilinformationen:', error.message);
                setUpdateMessage('Profilinformationen konnten nicht geladen werden.');
            } finally {
                setLoading(false);
            }
        };
    
        fetchProfile();
    }, [token]);
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileData((prevState) => ({
                ...prevState,
                profileImageFile: file,
                profileImage: URL.createObjectURL(file),
            }));
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('username', profileData.username);
        formData.append('email', profileData.email);
        formData.append('address', profileData.address); // Adres ve telefon numarası ekleniyor mu kontrol edin
        formData.append('phoneNumber', profileData.phoneNumber);
        if (profileData.password) formData.append('password', profileData.password);
        if (profileData.profileImageFile) {
            formData.append('profileImage', profileData.profileImageFile);
        }
    
        try {
            const response = await axios.put(`/users/profile`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            console.log("Güncellenen Kullanıcı Bilgisi:", response.data); // Güncellenen veriyi kontrol edin.
    
            setUpdateMessage('Profil erfolgreich aktualisiert.');
            setProfileData({
                ...profileData,
                password: '',
                profileImageFile: null,
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
            profileImageFile: null,
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
                            />
                        </Form.Group>

                        <Form.Group controlId="formPhoneNumber">
                            <Form.Label>Telefonnummer</Form.Label>
                            <Form.Control
                                type="text"
                                name="phoneNumber"
                                value={profileData.phoneNumber}
                                onChange={handleInputChange}
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
