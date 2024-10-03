import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';

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
          setUserInfo(response.data.user);
          localStorage.setItem('userInfo', JSON.stringify(response.data.user));
        } catch (error) {
          console.error('Token verification failed:', error);
          handleLogout(false);
        }
      }
      setLoading(false);
    };
    verifyToken();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/users/login', { email, password });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      setUserInfo(response.data.user);
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      navigate('/profile');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axiosInstance.post('/users/register', { username, email, password });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      setUserInfo(response.data.user);
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
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
