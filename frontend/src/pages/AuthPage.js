import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPage.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const AuthPage = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, register, googleLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) {
        await register(username, emailOrUsername, password);
      } else {
        await login(emailOrUsername, password);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid login credentials');
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      await googleLogin(response);
      navigate('/');
    } catch (error) {
      setError('Google login failed');
    }
  };

  const handleGoogleLoginError = () => {
    setError('Google login failed');
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="auth-container">
        <h2>{isRegister ? 'Registrieren' : 'Login'}</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="input-group">
              <label htmlFor="username">Benutzername</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}
          <div className="input-group">
            <label htmlFor="emailOrUsername">Email oder Benutzername</label>
            <input
              type="text"
              id="emailOrUsername"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Passwort</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">{isRegister ? 'Registrieren' : 'Login'}</button>
        </form>
        <div className="google-login">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
          />
        </div>
        <p className="info-note">Hinweis: Unser Mitgliedschaftssystem ist derzeit nicht aktiv.</p>
        <p>
          {isRegister ? 'Bereits ein Konto?' : 'Noch kein Konto?'}{' '}
          <button onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Login' : 'Registrieren'}
          </button>
        </p>
      </div>
    </GoogleOAuthProvider>
  );
};

export default AuthPage;
