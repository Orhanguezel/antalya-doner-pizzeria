// AuthContext.js
import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = async (emailOrUsername, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, { emailOrUsername, password });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      throw error;
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, { username, email, password });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
