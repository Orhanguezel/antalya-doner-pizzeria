import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios'; // Axios instance'ını kullanıyoruz
import { useAuth } from '../context/AuthContext';  // AuthContext'ten login fonksiyonunu kullanıyoruz
import './AuthPage.css';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login, setUserInfo } = useAuth();  // login fonksiyonunu AuthContext'ten çekiyoruz

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            if (isLogin) {
                // Giriş yapma işlemi
                await login(email, password);  // AuthContext'ten login fonksiyonunu çağırıyoruz
            } else {
                // Kayıt olma işlemi
                const response = await axios.post('/users/register', { username, email, password }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                data = response.data;

                // Kayıt başarılı olduğunda login fonksiyonunu çağırarak oturum açıyoruz
                setUserInfo(data);  // Kullanıcı bilgilerini AuthContext'e kaydediyoruz
                localStorage.setItem('userInfo', JSON.stringify(data));
                navigate('/profile');
            }

        } catch (error) {
            setError(error.response?.data?.message || 'Es gab ein Problem beim Anmelden. Bitte versuchen Sie es erneut.');
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

            <h2>{isLogin ? 'Login' : 'Registrieren'}</h2>

            {/* Hata mesajı varsa göster */}
            {error && <p className="error">{error}</p>}

            {/* Form */}
            <form onSubmit={handleSubmit}>
                {/* Kayıt sayfası için kullanıcı adı alanı */}
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

            {/* Kayıt ol linki, sadece login sayfasında görünür */}
            {isLogin && (
                <div className="register-link">
                    <p>Sie haben kein Konto? <a onClick={() => setIsLogin(false)}>Hier registrieren</a></p>
                </div>
            )}
        </div>
    );
};

export default AuthPage;
