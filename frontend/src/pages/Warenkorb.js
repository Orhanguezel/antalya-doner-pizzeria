import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa'; // İkonları import ettik
import './Warenkorb.css';

const Warenkorb = ({ cart, updateCartItemQuantity, removeCartItem, clearCart }) => {
  const [orderType, setOrderType] = useState('pickup'); // Default olarak 'pickup' seçili
  const [errorMessage, setErrorMessage] = useState('');
  const [missingFields, setMissingFields] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    surname: '',
    address: '',
    phone: '',
    region: '',
    paymentMethod: '',
    specialRequest: '' // Yeni alan
  });
  const [orderSuccessMessage, setOrderSuccessMessage] = useState('');
  const openingHours = "Mo. - Fr.: 11:00 bis 22:00, Sonntag: 16:00 bis 22:00, Feiertagen: 16:00 bis 22:00";
  const deliveryHours = "Mo. - Fr.: 11:30 bis 21:30, Sonntag: 16:30 bis 21:30, Feiertagen: 16:30 bis 21:30";
  const currentTime = new Date();
  const orderTime = currentTime.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  const isSaturday = currentTime.getDay() === 6;

  useEffect(() => {
    if (isSaturday) {
      setErrorMessage('Samstag ist Ruhetag.');
    }
  }, [isSaturday]);

  const calculateTotal = () => {
    let total = cart.reduce((acc, item) => acc + item.totalPrice, 0);
    if (orderType === 'delivery') {
      total += 2; // Taşıma ücreti
    }
    return total.toFixed(2);
  };

  const isOrderBelowMinimum = orderType === 'delivery' && parseFloat(calculateTotal()) < 15;

  const handleOrderTypeChange = (type) => {
    setOrderType(type);
    setErrorMessage('');
    setMissingFields([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handleCheckout = async () => {
    const total = parseFloat(calculateTotal());
    const fieldsToCheck = {
      delivery: ['name', 'surname', 'phone', 'address', 'region', 'paymentMethod'],
      pickup: ['name', 'surname', 'phone'],
      dinein: ['name', 'surname'],
    };
    const requiredFields = fieldsToCheck[orderType];
    const missing = requiredFields.filter(field => !customerInfo[field]);

    if (missing.length > 0) {
      setMissingFields(missing);
      setErrorMessage('Bitte füllen Sie alle erforderlichen Felder aus.');
      return;
    }

    const orderData = {
      customerInfo,
      items: cart,
      total,
      orderType,
      status: 'Gelen Siparişler',
      deliveryFee: orderType === 'delivery' ? 2 : 0,
      archived: false,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/orders`, orderData);
      console.log('Bestellung abgeschlossen:', response.data);
      clearCart();
      localStorage.removeItem('cart');
      setOrderSuccessMessage('Ihre Bestellung wurde erfolgreich abgeschlossen.');
      setErrorMessage('');
      setMissingFields([]);
    } catch (error) {
      console.error('Bestellung fehlgeschlagen:', error.response?.data || error.message);
      setErrorMessage('Es gab ein Problem mit Ihrer Bestellung. Bitte versuchen Sie es erneut.');
    }
  };

  return (
    <div className="cart">
      <h2>Bestellliste</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <h4>{item.quantity} x {item.nr}. {item.name} {item.selectedPrice.key === 'default' ? `${item.selectedPrice.value} €` : `${item.selectedPrice.key} - ${item.selectedPrice.value} €`}</h4>
            {item.extras.length > 0 ? (
              <>
                <p>Extras:</p>
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
              <button onClick={() => updateCartItemQuantity(item, item.quantity - 1)} disabled={item.quantity <= 1}><FaMinus /></button>
              <span>{item.quantity}</span>
              <button onClick={() => updateCartItemQuantity(item, item.quantity + 1)}><FaPlus /></button>
              <button onClick={() => removeCartItem(item)} className="remove-button"><FaTrash /></button>
            </div>
          </li>
        ))}
      </ul>
      <h3>Gesamtbetrag: {calculateTotal()} €</h3>

      <div className="order-type">
        <h3>Bestellart</h3>
        <label>
          <input
            type="radio"
            value="pickup"
            checked={orderType === 'pickup'}
            onChange={() => handleOrderTypeChange('pickup')}
          />
          Abholung im Restaurant
        </label>
        <label>
          <input
            type="radio"
            value="dinein"
            checked={orderType === 'dinein'}
            onChange={() => handleOrderTypeChange('dinein')}
          />
          Im Restaurant essen
        </label>
        <label>
          <input
            type="radio"
            value="delivery"
            checked={orderType === 'delivery'}
            onChange={() => handleOrderTypeChange('delivery')}
          />
          Lieferung
        </label>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      <div className="customer-info">
        <h3>Kundendaten</h3>
        <label>
          Name:<span className="required">*</span>
          <input
            type="text"
            name="name"
            value={customerInfo.name}
            onChange={handleInputChange}
            className={missingFields.includes('name') ? 'missing-field' : ''}
          />
        </label>
        <label>
          Nachname:<span className="required">*</span>
          <input
            type="text"
            name="surname"
            value={customerInfo.surname}
            onChange={handleInputChange}
            className={missingFields.includes('surname') ? 'missing-field' : ''}
          />
        </label>
        {(orderType === 'pickup' || orderType === 'delivery') && (
          <label>
            Telefon:<span className="required">*</span>
            <input
              type="text"
              name="phone"
              value={customerInfo.phone}
              onChange={handleInputChange}
              className={missingFields.includes('phone') ? 'missing-field' : ''}
            />
          </label>
        )}
        {orderType === 'delivery' && (
          <>
            <label>
              Adresse:<span className="required">*</span>
              <input
                type="text"
                name="address"
                value={customerInfo.address}
                onChange={handleInputChange}
                className={missingFields.includes('address') ? 'missing-field' : ''}
              />
            </label>
            <label>
              Region:<span className="required">*</span>
              <select
                name="region"
                value={customerInfo.region}
                onChange={handleInputChange}
                className={missingFields.includes('region') ? 'missing-field' : ''}
              >
                <option value="">Bitte wählen...</option>
                <option value="Aldenhoven">Aldenhoven</option>
                <option value="Niedermerz">Niedermerz</option>
                <option value="Durboslar">Durboslar</option>
                <option value="Schleiden">Schleiden</option>
                <option value="Engelsdorf">Engelsdorf</option>
                <option value="Freialdenhoven">Freialdenhoven</option>
                <option value="Pützdorf">Pützdorf</option>
                <option value="Merzenhausen">Merzenhausen</option>
                <option value="Bourheim">Bourheim</option>
                <option value="Koslar">Koslar</option>
                <option value="Siesdorf">Siesdorf</option>
              </select>
            </label>
            <label>
              Zahlungsmethode:<span className="required">*</span>
              <select
                name="paymentMethod"
                value={customerInfo.paymentMethod}
                onChange={handleInputChange}
                className={missingFields.includes('paymentMethod') ? 'missing-field' : ''}
              >
                <option value="">Bitte wählen...</option>
                <option value="Kreditkarte">Kreditkarte</option>
                <option value="Barzahlung">Barzahlung</option>
              </select>
            </label>
            <p className="delivery-fee">Die Liefergebühr ist für alle Regionen gleich und beträgt 2 €.</p>
          </>
        )}
        <label>
          Besondere Wünsche:
          <input
            type="text"
            name="specialRequest"
            value={customerInfo.specialRequest}
            onChange={handleInputChange}
          />
        </label>
      </div>

      {isOrderBelowMinimum && <div className="minimum-order-warning">Für Lieferungen beträgt der Mindestbestellwert 15 Euro.</div>}
      {orderSuccessMessage && <p className="order-success">{orderSuccessMessage}</p>}
      
      <button 
        className="checkout-button" 
        onClick={handleCheckout} 
        disabled={isOrderBelowMinimum}
        title={isOrderBelowMinimum ? 'Für Lieferungen beträgt der Mindestbestellwert 15 Euro.' : ''}
      >
        Bestellung abschließen
      </button>

      <div className="store-info">
        <div className="card">
          <h3><strong>Öffnungszeiten:</strong></h3>
          <p>{openingHours}</p>
        </div>
        <div className="card">
          <h3><strong>Lieferzeiten:</strong></h3>
          <p>{deliveryHours}</p>
        </div>

        {isSaturday && (
          <div className="card">
            <h3><strong>Ruhetag</strong></h3>
            <p>Samstag</p>
          </div>
        )}
        
        <div className="card">
          <h3><strong>Bestellzeit</strong></h3>
          <p>{orderTime}</p>
        </div>
      
      </div>
    </div>
  );
};

export default Warenkorb;
