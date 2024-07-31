import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUtensils, faShoppingCart, faPhone, faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = ({ cart }) => {
  const { token, logout } = useAuth();

  return (
    <header className="header">
      <div className="logo">
        <img src="/assets/logo/1.png" alt="Logo" />
      </div>
      <nav className="navbar">
        <Link to="/" aria-label="Home">
          <FontAwesomeIcon icon={faHome} /> <span className="nav-link-text">Home</span>
        </Link>
        <Link to="/menu" aria-label="Menu">
          <FontAwesomeIcon icon={faUtensils} /> <span className="nav-link-text">Menu</span>
        </Link>
        <Link to="/warenkorb" aria-label="Warenkorb">
          <FontAwesomeIcon icon={faShoppingCart} />
          <span className="nav-link-text">Warenkorb</span>
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </Link>
        <Link to="/kontakt" aria-label="Kontakt">
          <FontAwesomeIcon icon={faPhone} /> <span className="nav-link-text">Kontakt</span>
        </Link>
        {token ? (
          <div className="nav-user">
            <FontAwesomeIcon icon={faUser} aria-label="User" /> 
            <div className="user-dropdown">
              <Link to="/profile" aria-label="Profile">Profil</Link>
              <button onClick={logout} aria-label="Logout">Logout</button>
            </div>
          </div>
        ) : (
          <Link to="/auth" aria-label="Register or Login">
            <FontAwesomeIcon icon={faSignInAlt} /> <span className="nav-link-text">Register/Login</span>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
