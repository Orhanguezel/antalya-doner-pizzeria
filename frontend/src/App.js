import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import AuthPage from './pages/AuthPage';
import AdminBlogPage from './pages/AdminBlogPage';
import ProfilePage from './pages/ProfilePage'; 
import AdminProfilePage from './pages/AdminProfilePage'; 
import Header from './components/Header';
import Footer from './components/Footer';
import NotFoundPage from './pages/NotFoundPage'; // 404 Sayfa Bulunamadı sayfası

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
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogDetailPage />} />
                <Route path="/auth" element={<AuthPage setUserInfo={setUserInfo} />} />
                
                <Route
                    path="/profile"
                    element={userInfo ? <ProfilePage userInfo={userInfo} /> : <Navigate to="/auth" />}
                />

                <Route
                    path="/admin/blogs"
                    element={userInfo?.role === 'admin' ? <AdminBlogPage /> : <Navigate to="/auth" />}
                />

                <Route
                    path="/admin/users"
                    element={userInfo?.role === 'admin' ? <AdminProfilePage userInfo={userInfo} /> : <Navigate to="/auth" />}
                />

                <Route
                    path="/admin"
                    element={userInfo?.role === 'admin' ? <Navigate to="/admin/blogs" /> : <Navigate to="/auth" />}
                />

                <Route path="*" element={<NotFoundPage />} /> {/* 404 sayfasını ekleyin */}
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
