import React from 'react';
import { Container } from 'react-bootstrap';

const NotFoundPage = () => {
    return (
        <Container className="text-center mt-5">
            <h1>404 - Sayfa Bulunamadı</h1>
            <p>Üzgünüz, aradığınız sayfa mevcut değil.</p>
        </Container>
    );
};

export default NotFoundPage;
