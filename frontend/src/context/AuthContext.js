// src/context/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiInstance from "../axios"; // Tek axios instance

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

  // LocalStorage verilerini kaydetme fonksiyonu
  const saveToLocalStorage = (token, userInfo) => {
    if (token && userInfo) {
      localStorage.setItem('token', token);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
    }
  };

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        // Token doğrulama isteği
        const response = await apiInstance.get(`/users/verify-token`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo(response.data.user);
        saveToLocalStorage(token, response.data.user);
      } catch (error) {
        console.error('Token verification failed:', error.response ? error.response.data : error.message);
        handleLogout(false);
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await apiInstance.post('/users/login', { email, password });
      setToken(response.data.token);
      setUserInfo(response.data);
      saveToLocalStorage(response.data.token, response.data);
      
      // Admin ise admin sayfasına yönlendirme
      if (response.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      throw error.response?.data?.message || 'Login failed.';
    }
  };

  const register = async (username, email, password, address, phoneNumber) => {
    try {
      const response = await apiInstance.post('/users/register', {
        username, email, password, address, phoneNumber
      });
      setToken(response.data.token);
      setUserInfo(response.data);
      saveToLocalStorage(response.data.token, response.data);
      
      // Admin ise admin sayfasına yönlendirme
      if (response.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      console.error('Register failed:', error.response ? error.response.data : error.message);
      throw error.response?.data?.message || 'Registration failed.';
    }
  };

  const handleLogout = (redirect = true) => {
    setToken(null);
    setUserInfo(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    if (redirect) {
      navigate('/auth');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userInfo,
        setUserInfo,
        login,
        register,
        logout: handleLogout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};


