import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { userInfo } = useAuth();
  const navigate = useNavigate(); // Kullanıcıyı yönlendirmek için kullanılıyor

  if (!userInfo) {
    // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
    return <Navigate to="/auth" />;
  }

  if (requiredRole && userInfo.role !== requiredRole) {
    // Kullanıcının rolü yetkisizse ana sayfaya yönlendir
    setTimeout(() => {
      navigate('/'); // Belirli bir süre sonra ana sayfaya yönlendirme yap
    }, 3000);

    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Zugriff verweigert</h1>
        <p>Sie haben keine Berechtigung, diese Seite zu betreten.</p>
        <button onClick={() => navigate('/')}>Zurück zur Startseite</button>
      </div>
    );
  }

  // Kullanıcının rolü yetkiliyse sayfayı göster
  return children;
};

export default ProtectedRoute;
