import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const response = await axios.get(`/api/users/verify-token`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserInfo(response.data.user);
          localStorage.setItem('userInfo', JSON.stringify(response.data.user));
        } catch (error) {
          console.error('Token verification failed:', error);
          logout();
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`/api/users/login`, { email, password });
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

  const logout = () => {
    setToken(null);
    setUserInfo(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    navigate('/auth');
  };

  return (
    <AuthContext.Provider value={{ token, userInfo, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
