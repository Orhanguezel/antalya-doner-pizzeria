import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    // Kullanıcı login olmuş mu ve admin mi diye kontrol ediliyor.
    if (!user || user.role !== 'admin') {
        // Eğer kullanıcı giriş yapmamışsa ya da admin değilse, login sayfasına yönlendir.
        return <Navigate to="/login" />;
    }

    // Eğer kullanıcı admin ise, bileşeni render et.
    return children;
};

export default ProtectedRoute;
