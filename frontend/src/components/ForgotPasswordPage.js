import React, { useState } from 'react';
import axios from '../axios';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('/api/users/forgot-password', { email });
            setMessage(data.message);
        } catch (error) {
            setMessage('Something went wrong.');
        }
    };

    return (
        <div className="forgot-password-page">
            <h2>Şifre Sıfırla</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email adresinizi girin"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Sıfırlama Bağlantısı Gönder</button>
            </form>
        </div>
    );
};

export default ForgotPasswordPage;
