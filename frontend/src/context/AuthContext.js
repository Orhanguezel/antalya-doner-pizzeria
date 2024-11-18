// src/context/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiInstance from "../axios"; // Kimlik doğrulaması gerekmeyen API çağrıları için axios instance
import authInstance from "../authAxios"; // Kimlik doğrulaması gerektiren API çağrıları için authAxios

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
        const response = await authInstance.get(`/users/verify-token`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(response.data.user);
        saveToLocalStorage(token, response.data.user);
      } catch (error) {
        console.error('Token verification failed:', error);
        handleLogout(false);
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await authInstance.post('/users/login', { email, password });
      setToken(response.data.token);
      setUserInfo(response.data.user);
      saveToLocalStorage(response.data.token, response.data.user);
      navigate('/profile');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await authInstance.post('/users/register', { username, email, password });
      setToken(response.data.token);
      setUserInfo(response.data.user);
      saveToLocalStorage(response.data.token, response.data.user);
      navigate('/profile');
    } catch (error) {
      console.error('Register failed:', error);
      throw error;
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
    <AuthContext.Provider value={{ token, userInfo, setUserInfo, login, register, logout: handleLogout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
