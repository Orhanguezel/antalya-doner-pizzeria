import React, { useState } from 'react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <form>
          {!isLogin && (
            <>
              <input type="text" placeholder="Name" required />
              <input type="text" placeholder="Surname" required />
            </>
          )}
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Go to Register' : 'Go to Login'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
