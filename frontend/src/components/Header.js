import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUtensils, faShoppingCart, faPhone, faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo/1.png';  // Logoyu import edin
import './Header.css';

const Header = ({ cart }) => {
  const { token, logout } = useAuth();

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" />  {/* Logoyu burada kullanın */}
      </div>
      <nav className="navbar">
        <Link to="/">
          <FontAwesomeIcon icon={faHome} /> <span className="nav-link-text">Home</span>
        </Link>
        <Link to="/menu">
          <FontAwesomeIcon icon={faUtensils} /> <span className="nav-link-text">Menu</span>
        </Link>
        <Link to="/warenkorb">
          <FontAwesomeIcon icon={faShoppingCart} />
          <span className="nav-link-text">Warenkorb</span>
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </Link>
        <Link to="/kontakt">
          <FontAwesomeIcon icon={faPhone} /> <span className="nav-link-text">Kontakt</span>
        </Link>
        {token ? (
          <div className="nav-user">
            <FontAwesomeIcon icon={faUser} />
            <div className="user-dropdown">
              <Link to="/profile">Profil</Link>
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        ) : (
          <Link to="/auth">
            <FontAwesomeIcon icon={faSignInAlt} /> <span className="nav-link-text">Register/Login</span>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
