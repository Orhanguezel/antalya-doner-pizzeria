import React from 'react';
import { calculateTotal } from '../utils/cart-utils';

const Cart = ({ cart, updateCartItemQuantity, removeCartItem }) => {
  return (
    <div className="cart">
      <h2>Bestellliste</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <h4>{item.quantity} x {item.nr}. {item.name}</h4>
            {item.selectedPrice && item.selectedPrice.key !== 'default' && (
              <p>{item.selectedPrice.key} - {item.selectedPrice.value} €</p>
            )}
            {item.extras && item.extras.length > 0 ? (
              <>
                <p>Extras:</p>
                <ul>
                  {item.extras.map((extra, idx) => (
                    <li key={idx}>{extra.name.replace(/([a-z])([A-Z])/g, '$1 $2')} (+{extra.price} €)</li>
                  ))}
                </ul>
                <p>Gesamtpreis: {item.totalPrice} €</p>
              </>
            ) : (
              <p>Preis: {item.totalPrice} €</p>
            )}
            <div className="quantity-controls">
              <button onClick={() => updateCartItemQuantity(item, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateCartItemQuantity(item, item.quantity + 1)}>+</button>
              <button onClick={() => removeCartItem(item)} className="remove-button">🗑️</button>
            </div>
          </li>
        ))}
      </ul>
      <h3>Gesamtbetrag: {calculateTotal(cart)} €</h3>
    </div>
  );
};

export default Cart;
