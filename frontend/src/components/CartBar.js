// src/components/CartBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './CartBar.css';

const CartBar = ({ cart }) => {
  const calculateCartTotal = () => {
    return cart.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2);
  };

  return (
    <div className="cart-bar">
      <div className="cart-icon-container">
        <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" data-count={cart.length} />
        <span>{cart.length} Artikel</span>
      </div>
      <Link to="/warenkorb" className="cart-button">Zum Warenkorb</Link>
      <div className="cart-total">{calculateCartTotal()} €</div>
    </div>
  );
};

export default CartBar;
