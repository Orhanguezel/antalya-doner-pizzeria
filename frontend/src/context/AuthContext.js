import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode'; // Değişiklik burada: jwt-decode'u named import olarak import edin.

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const decoded = jwt_decode.default(token); // Burada jwt_decode.default olarak kullanın
      setUser(decoded);
    }
  }, [token]);

  const login = async (email, password) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });
    const { token, data } = response.data;
    setToken(token);
    setUser(data);
    localStorage.setItem('token', token);
    navigate(data.role === 'admin' ? '/admin' : '/profile');
  };

  const register = async (username, email, password) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, { username, email, password });
    const { token, data } = response.data;
    setToken(token);
    setUser(data);
    localStorage.setItem('token', token);
    navigate('/profile');
  };

  const googleLogin = async (response) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/google`, {
        token: response.credential,
      });
      const { token, data } = res.data;
      setToken(token);
      setUser(data);
      localStorage.setItem('token', token);
      navigate(data.role === 'admin' ? '/admin' : '/profile');
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
