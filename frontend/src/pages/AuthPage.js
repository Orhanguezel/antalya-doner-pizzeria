import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import './AuthPage.css';

const AuthPage = ({ setUserInfo }) => {
    const [isLogin, setIsLogin] = useState(true); // Giriş mi yoksa kayıt mı olduğunu kontrol eder
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            if (isLogin) {
                const response = await axios.post('/users/login', { email, password });
                data = response.data;
            } else {
                const response = await axios.post('/users/register', { username, email, password });
                data = response.data;
            }

            localStorage.setItem('userInfo', JSON.stringify(data));
            setUserInfo(data);

            if (data.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/profile');
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message);
        }
    };

    return (
        <div className="auth-page">
            <div className="toggle-btn-group">
                <button
                    className={isLogin ? 'active' : ''}
                    onClick={() => setIsLogin(true)}
                >
                    Login
                </button>
                <button
                    className={!isLogin ? 'active' : ''}
                    onClick={() => setIsLogin(false)}
                >
                    Register
                </button>
            </div>

            <h2>{isLogin ? 'Login' : 'Register'}</h2>

            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div className="form-group">
                        <label htmlFor="username">Benutzername</label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Passwort</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {isLogin ? 'Login' : 'Registrieren'}
                </button>
            </form>

            {isLogin && (
                <div className="register-link">
                    <p>Sie haben kein Konto? <a onClick={() => setIsLogin(false)}>Hier registrieren</a></p>
                </div>
            )}
        </div>
    );
};

export default AuthPage;
