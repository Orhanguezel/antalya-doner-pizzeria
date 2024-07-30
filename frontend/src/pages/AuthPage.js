import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './AuthPage.css';

const AuthPage = () => {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await register(username, emailOrUsername, password);
      } else {
        await login(emailOrUsername, password);
      }
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Ein Fehler ist aufgetreten');
    }
  };

  return (
    <div className="auth-container">
      <h2>{isRegister ? 'Registrieren' : 'Login'}</h2>
      <form onSubmit={handleAuth}>
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
      <p className="info-note">Hinweis: Unser Mitgliedschaftssystem ist derzeit nicht aktiv.</p>
      <p>
        {isRegister ? 'Bereits ein Konto?' : 'Noch kein Konto?'}{' '}
        <button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Login' : 'Registrieren'}
        </button>
      </p>
    </div>
  );
};

export default AuthPage;
