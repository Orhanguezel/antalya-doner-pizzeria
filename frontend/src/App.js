import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import AdminProfilePage from './pages/AdminProfilePage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo));
        }
    }, []);

    return (
        <Router>
            <Header userInfo={userInfo} />
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage setUserInfo={setUserInfo} />} />
                
                {/* Kullanıcı rolüne göre profile yönlendirme */}
                <Route
                    path="/profile"
                    element={userInfo?.role === 'admin' ? <AdminProfilePage userInfo={userInfo} /> : <ProfilePage userInfo={userInfo} />}
                />

                <Route path="*" element={<Navigate to="/" />} /> {/* 404 sayfası yerine ana sayfaya yönlendirin */}
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
