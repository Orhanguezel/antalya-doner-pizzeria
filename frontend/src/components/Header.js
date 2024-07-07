import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUtensils, faShoppingCart, faInfoCircle, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = ({ cart }) => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/path/to/logo.png" alt="Logo" />
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
          <FontAwesomeIcon icon={faInfoCircle} /> <span className="nav-link-text">Kontakt</span>
        </Link>
        <Link to="/auth">
          <FontAwesomeIcon icon={faSignInAlt} /> <span className="nav-link-text">Register/Login</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
