// src/pages/ProfilePage.js

import React, { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import axios from '../axios';

const ProfilePage = ({ userInfo }) => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/users/profile');
                const data = response.data;
                setProfileData(data);
                setLoading(false);
            } catch (error) {
                console.error('Profil bilgilerini yüklerken bir hata oluştu:', error.message);
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <p>Profil bilgileri yükleniyor...</p>;
    }

    return (
        <Container className="mt-4">
            <h2>Profil</h2>
            <Card>
                <Card.Body>
                    <Card.Title>Benutzerinformationen</Card.Title>
                    <Card.Text>
                        <strong>Benutzername:</strong> {profileData?.username || 'Bilinmiyor'}
                    </Card.Text>
                    <Card.Text>
                        <strong>Email:</strong> {profileData?.email || 'Bilinmiyor'}
                    </Card.Text>
                    <Card.Text>
                        <strong>Rolle:</strong> {profileData?.role || 'Bilinmiyor'}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProfilePage;
