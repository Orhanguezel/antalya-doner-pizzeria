import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// AuthContext oluşturuluyor
const AuthContext = createContext();

// AuthProvider bileşeni
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // login fonksiyonu
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, { email, password });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      navigate('/profile');
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // register fonksiyonu
  const register = async (username, email, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, { username, email, password });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      navigate('/profile');
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  // logout fonksiyonu
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/auth');
  };

  // Token doğrulama süreci
  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          await axios.get(`${process.env.REACT_APP_API_BASE_URL}/auth/verify-token`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          console.error("Token verification failed:", error);
          logout(); // Token geçersizse logout yapılıyor
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, [token]);

  if (loading) {
    return <div className="loading-screen">Loading...</div>; // Daha iyi bir kullanıcı deneyimi için stilize edilmiş yükleme ekranı
  }

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth kancası ile AuthContext değerlerine erişim sağlanıyor
export const useAuth = () => {
  return useContext(AuthContext);
};
