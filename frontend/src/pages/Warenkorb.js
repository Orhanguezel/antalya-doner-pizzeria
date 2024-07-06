import React, { useState } from 'react';
import './Warenkorb.css';

const Warenkorb = ({ cart, updateCartItemQuantity, removeCartItem }) => {
  const [orderType, setOrderType] = useState('pickup'); // Default olarak 'pickup' seçili
  const [errorMessage, setErrorMessage] = useState('');

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2);
  };

  const handleOrderTypeChange = (type) => {
    setOrderType(type);
    setErrorMessage('');
  };

  const handleCheckout = () => {
    const total = parseFloat(calculateTotal());
    if (orderType === 'delivery' && total < 15) {
      setErrorMessage('Eve servis için minimum sipariş tutarı 15 € olmalıdır.');
      return;
    }
    // Sipariş tamamlama işlemleri burada gerçekleştirilecek
    console.log('Sipariş tamamlandı:', { orderType, cart, total });
  };

  return (
    <div className="cart">
      <h2>Sipariş Listesi</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <h4>{item.nr}. {item.name}</h4>
            {item.selectedPrice.key !== 'default' && (
              <p>{item.selectedPrice.key} - {item.selectedPrice.value} €</p>
            )}
            {item.extras.length > 0 ? (
              <>
                <p>Ekstralar:</p>
                <ul>
                  {item.extras.map((extra, index) => (
                    <li key={index}>{extra.name.replace(/([a-z])([A-Z])/g, '$1 $2')} (+{extra.price} €)</li>
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
              <button onClick={() => removeCartItem(item)}>Sil</button>
            </div>
          </li>
        ))}
      </ul>
      <h3>Gesamtbetrag: {calculateTotal()} €</h3>

      <div className="order-type">
        <h3>Sipariş Türü</h3>
        <label>
          <input
            type="radio"
            value="pickup"
            checked={orderType === 'pickup'}
            onChange={() => handleOrderTypeChange('pickup')}
          />
          Restaurandan Paket Alma
        </label>
        <label>
          <input
            type="radio"
            value="dinein"
            checked={orderType === 'dinein'}
            onChange={() => handleOrderTypeChange('dinein')}
          />
          Restoranda Masaya
        </label>
        <label>
          <input
            type="radio"
            value="delivery"
            checked={orderType === 'delivery'}
            onChange={() => handleOrderTypeChange('delivery')}
          />
          Eve Servis
        </label>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      <button className="checkout-button" onClick={handleCheckout}>Siparişi Tamamla</button>
    </div>
  );
};

export default Warenkorb;
