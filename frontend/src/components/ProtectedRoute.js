import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { userInfo } = useAuth();

  if (!userInfo) {
    // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
    return <Navigate to="/auth" />;
  }

  if (requiredRole && userInfo.role !== requiredRole) {
    // Kullanıcının rolü yetkisizse bir mesaj göster ve başka bir sayfaya yönlendir
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Zugriff verweigert</h1>
        <p>Sie haben keine Berechtigung, diese Seite zu betreten.</p>
        <button onClick={() => window.history.back()}>Zurück</button>
      </div>
    );
  }

  // Kullanıcının rolü yetkiliyse sayfayı göster
  return children;
};

export default ProtectedRoute;
