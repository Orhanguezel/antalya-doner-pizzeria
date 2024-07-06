import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/kontakt">Kontakt</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/warenkorb">Warenkorb</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
