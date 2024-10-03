import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios'; // Axios'u doğru şekilde import ediyoruz
import { useAuth } from '../context/AuthContext'; // AuthContext'ten login fonksiyonunu kullanıyoruz
import './AuthPage.css';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true); // Giriş mi yoksa kayıt mı olduğunu kontrol eder
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const { login, setUserInfo } = useAuth(); // useAuth ile login ve setUserInfo fonksiyonlarını alıyoruz

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            if (isLogin) {
                // Giriş yapma işlemi (AuthContext'teki login fonksiyonunu kullanıyoruz)
                await login(email, password);
                navigate('/profile'); // Başarılı giriş sonrası profile yönlendir
            } else {
                // Kayıt olma işlemi
                const response = await axios.post('/users/register', { username, email, password });
                data = response.data;

                // Yeni kullanıcı kaydı yapıldığında oturum açmak için login fonksiyonunu kullanıyoruz
                setUserInfo(data); // Eğer `setUserInfo` burada hata veriyorsa, AuthContext'te bu fonksiyonu tanımlamamız gerekiyor
                localStorage.setItem('userInfo', JSON.stringify(data));
                navigate('/profile'); // Kayıt başarılıysa profile yönlendir
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
