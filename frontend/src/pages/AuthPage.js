import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import { useAuth } from '../context/AuthContext';
import './AuthPage.css';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true); // Giriş ve Kayıt arasında geçiş için
    const [username, setUsername] = useState(''); // Kullanıcı adı
    const [email, setEmail] = useState(''); // Email
    const [password, setPassword] = useState(''); // Şifre
    const [profileImage, setProfileImage] = useState(null); // Profil resmi
    const [error, setError] = useState(''); // Hata mesajı
    const [userList, setUserList] = useState([]); // Kullanıcı listesi (Admin kontrolü için)
    const [role, setRole] = useState('user'); // Kullanıcı rolü
    const navigate = useNavigate();
    const { setUserInfo, userInfo } = useAuth(); // Auth context'den kullanıcı bilgilerini almak

    useEffect(() => {
        if (userInfo?.role === 'admin') {
            fetchUsers(); // Eğer admin ise kullanıcı listesini getir
        }
    }, [userInfo]);

    // Tüm kullanıcıları çekme fonksiyonu (Admin işlemi için)
    const fetchUsers = async () => {
        try {
            const response = await axios.get('/users');
            setUserList(response.data);
        } catch (error) {
            console.error('Kullanıcılar alınırken hata oluştu:', error);
        }
    };

    // Üyelik giriş veya kayıt işlemi
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            if (isLogin) {
                const response = await axios.post('/users/login', { email, password });
                data = response.data;
            } else {
                const formData = new FormData();
                formData.append('username', username);
                formData.append('email', email);
                formData.append('password', password);
                formData.append('role', role);
                if (profileImage) {
                    formData.append('profileImage', profileImage);
                }
                const response = await axios.post('/users/register', formData);
                data = response.data;
            }

            localStorage.setItem('userInfo', JSON.stringify(data)); // Kullanıcı bilgilerini localStorage'a kaydet
            setUserInfo(data); // Kullanıcı bilgilerini context'e aktar

            if (data.role === 'admin') {
                navigate('/admin'); // Eğer admin ise admin paneline yönlendir
            } else {
                navigate('/profile'); // Normal kullanıcı ise profil sayfasına yönlendir
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message);
        }
    };

    // Kullanıcıyı bloklama fonksiyonu (Admin işlemi)
    const handleBlockUser = async (userId) => {
        try {
            await axios.delete(`/users/${userId}`);
            fetchUsers(); // Kullanıcı bloklandıktan sonra listeyi güncelle
        } catch (error) {
            console.error('Kullanıcı bloklanırken hata oluştu:', error);
        }
    };

    // Kullanıcının profilini güncelleme
    const handleUpdateProfile = async () => {
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            if (profileImage) {
                formData.append('profileImage', profileImage);
            }
            const response = await axios.put('/users/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUserInfo(response.data); // Güncellenmiş kullanıcı bilgilerini context'e aktar
            localStorage.setItem('userInfo', JSON.stringify(response.data)); // Güncellenmiş bilgileri localStorage'a kaydet
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message);
        }
    };

    // Kullanıcının rolünü güncelleme (Admin işlemi)
    const handleUpdateRole = async (userId, newRole) => {
        try {
            await axios.put(`/users/${userId}/role`, { role: newRole });
            fetchUsers(); // Rol güncellendikten sonra listeyi güncelle
        } catch (error) {
            console.error('Kullanıcı rolü güncellenirken hata oluştu:', error);
        }
    };

    return (
        <div className="auth-page">
            <div className="toggle-btn-group">
                <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>
                    Giriş Yap
                </button>
                <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>
                    Kayıt Ol
                </button>
            </div>

            <h2>{isLogin ? 'Giriş Yap' : 'Kayıt Ol'}</h2>

            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div className="form-group">
                        <label htmlFor="username">Kullanıcı Adı</label>
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
                    <label htmlFor="password">Şifre</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {!isLogin && (
                    <div className="form-group">
                        <label htmlFor="profileImage">Profil Resmi</label>
                        <input
                            type="file"
                            id="profileImage"
                            className="form-control"
                            onChange={(e) => setProfileImage(e.target.files[0])}
                        />
                    </div>
                )}
                {!isLogin && (
                    <div className="form-group">
                        <label htmlFor="role">Kullanıcı Rolü</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="form-control"
                        >
                            <option value="user">Kullanıcı</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                )}
                <button type="submit" className="btn btn-primary">
                    {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
                </button>
            </form>

            {isLogin && (
                <div className="register-link">
                    <p>Hesabınız yok mu? <a onClick={() => setIsLogin(false)}>Buradan Kayıt Ol</a></p>
                </div>
            )}

            {userInfo && (
                <div className="user-actions">
                    <button onClick={handleUpdateProfile} className="btn btn-secondary">Profil Güncelle</button>
                </div>
            )}

            {userInfo?.role === 'admin' && (
                <div className="user-list">
                    <h3>Kullanıcılar</h3>
                    <ul>
                        {userList.map((user) => (
                            <li key={user._id}>
                                {user.username} ({user.email})
                                <button onClick={() => handleBlockUser(user._id)}>Kullanıcıyı Blokla</button>
                                <button onClick={() => handleUpdateRole(user._id, 'admin')}>Admin Yap</button>
                                <button onClick={() => handleUpdateRole(user._id, 'user')}>Kullanıcı Yap</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AuthPage;
