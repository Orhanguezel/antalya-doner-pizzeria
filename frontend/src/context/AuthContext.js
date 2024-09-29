import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';  // axiosInstance burada kullanılıyor

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userInfo, setUserInfo] = useState(() => {
    try {
      const storedUserInfo = localStorage.getItem('userInfo');
      return storedUserInfo && storedUserInfo !== "undefined" ? JSON.parse(storedUserInfo) : null;
    } catch (error) {
      console.error('Error parsing userInfo from localStorage:', error);
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const response = await axiosInstance.get(`/users/verify-token`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // Token doğrulandı, kullanıcı bilgilerini güncelle.
          setUserInfo(response.data.user);
          localStorage.setItem('userInfo', JSON.stringify(response.data.user));
        } catch (error) {
          console.error('Token verification failed:', error);
          handleLogout(false); // Hata durumunda token'ı temizleyin ama yönlendirme yapmayın.
        }
      }
      setLoading(false); // Yüklenme durumu bitti
    };

    verifyToken();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post(`/users/login`, { email, password });
      // Başarılı login durumunda token ve kullanıcı bilgilerini güncelle.
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      setUserInfo(response.data.user);
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      // Kullanıcı profil sayfasına yönlendir.
      navigate('/profile');
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Hata fırlatarak frontend'te doğru hata mesajını gösterebilirsiniz.
    }
  };

  const handleLogout = (shouldNavigate = true) => {
    setToken(null);
    setUserInfo(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    if (shouldNavigate) navigate('/auth'); // Token doğrulama sırasında yönlendirme olmaması için parametre ekledik.
  };

  return (
    <AuthContext.Provider value={{ token, userInfo, login, logout: handleLogout }}>
      {!loading && children} {/* loading tamamlandığında render */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
