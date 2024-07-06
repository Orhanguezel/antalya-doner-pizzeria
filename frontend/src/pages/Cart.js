import React from 'react';
import './Cart.css';

const Cart = ({ cart }) => {
  return (
    <div className="cart">
      <h2>Sipariş Listesi</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <h4>{item.nr}. {item.name}</h4>
            <p>Seçilen Fiyat: {item.selectedPrice.key} - {item.selectedPrice.value} €</p>
            <p>Ekstralar:</p>
            <ul>
              {item.extras.map((extra, index) => (
                <li key={index}>{extra.name} (+{extra.price} €)</li>
              ))}
            </ul>
            <p>Toplam Fiyat: {item.totalPrice} €</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
