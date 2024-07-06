import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = ({ cart }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header>
      <nav>
        <Link to="/" className="icon-only">
          <i className="fas fa-home"></i>
        </Link>
        <Link to="/menu" className="icon-only">
          <i className="fas fa-utensils"></i>
        </Link>
        <Link to="/warenkorb" className="cart-icon icon-only">
          <i className="fas fa-shopping-cart"></i>
          {cartItemCount > 0 && <span>{cartItemCount}</span>}
        </Link>
        <Link to="/kontakt" className="icon-only">
          <i className="fas fa-envelope"></i>
        </Link>
        <Link to="/" className="large-screen">
          Home
        </Link>
        <Link to="/menu" className="large-screen">
          Menu
        </Link>
        <Link to="/warenkorb" className="cart-icon large-screen">
          <i className="fas fa-shopping-cart"></i>
          Warenkorb
          {cartItemCount > 0 && <span>{cartItemCount}</span>}
        </Link>
        <Link to="/kontakt" className="large-screen">
          Kontakt
        </Link>
        {user ? (
          <div className="user-info">
            <span>{user.username}</span>
            <button onClick={handleLogout}>Logout</button>
            {user.role === 'admin' && <Link to="/admin">Admin Panel</Link>}
          </div>
        ) : (
          <>
            <Link to="/register" className="large-screen">
              Register
            </Link>
            <Link to="/login" className="large-screen">
              Login
            </Link>
            <Link to="/register" className="icon-only">
              <i className="fas fa-user-plus"></i>
            </Link>
            <Link to="/login" className="icon-only">
              <i className="fas fa-sign-in-alt"></i>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
