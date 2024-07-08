import React, { useState, useEffect } from 'react';
import './Warenkorb.css';

const Warenkorb = ({ cart, updateCartItemQuantity, removeCartItem, clearCart }) => {
  const [orderType, setOrderType] = useState('pickup'); // Default olarak 'pickup' seçili
  const [errorMessage, setErrorMessage] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    surname: '',
    email: '',
    address: '',
    phone: '',
    region: '',
    paymentMethod: '',
    specialRequest: '' // Özel İstek alanı
  });

  // Açılış-kapanış saatleri ve sipariş saatlerini belirleyelim
  const openingHours = "Mo. - Fr.: 11:00 bis 22:00, Sonntag: 16:00 bis 22:00, Feiertagen: 16:00 bis 22:00";
  const deliveryHours = "Mo. - Fr.: 11:30 bis 21:30, Sonntag: 16:30 bis 21:30, Feiertagen: 16:30 bis 21:30";
  const currentTime = new Date();
  const orderTime = currentTime.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });

  // Cumartesi günleri kontrolü
  const isSaturday = currentTime.getDay() === 6;

  // Sayfa yüklendiğinde cumartesi kontrolü
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

  const handleOrderTypeChange = (type) => {
    setOrderType(type);
    setErrorMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handleCheckout = () => {
    // Not: Sipariş saati engellemesi şu an devre dışı bırakıldı
    // if (isSaturday) {
    //   setErrorMessage('Samstag ist Ruhetag. Bestellungen können nicht aufgegeben werden.');
    //   return;
    // }

    const total = parseFloat(calculateTotal());
    if (orderType === 'delivery' && total < 15) {
      setErrorMessage('Für die Lieferung muss der Mindestbestellwert 15 € betragen.');
      return;
    }
    if (orderType === 'delivery' && (!customerInfo.name || !customerInfo.surname || !customerInfo.address || !customerInfo.phone || !customerInfo.region || !customerInfo.paymentMethod)) {
      setErrorMessage('Bitte füllen Sie alle erforderlichen Felder aus.');
      return;
    }
    if ((orderType === 'dinein' || orderType === 'pickup') && (!customerInfo.name || !customerInfo.surname)) {
      setErrorMessage('Bitte füllen Sie Ihren Namen und Nachnamen aus.');
      return;
    }
    if (orderType === 'pickup' && !customerInfo.phone) {
      setErrorMessage('Bitte füllen Sie Ihre Telefonnummer aus.');
      return;
    }

    // Sipariş tamamlama işlemleri burada gerçekleştirilecek
    console.log('Bestellung abgeschlossen:', { orderType, cart, total, customerInfo });
    clearCart(); // Sepeti temizle
    localStorage.removeItem('cart'); // localStorage'dan sepeti kaldır
    setErrorMessage('Ihre Bestellung wurde erfolgreich abgeschlossen.'); // Siparişin tamamlandığını kullanıcıya bildir
  };

  return (
    <div className="cart">
      <h2>Bestellliste</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <h4>{item.nr}. {item.name}</h4>
            {item.selectedPrice.key !== 'default' && (
              <p>{item.selectedPrice.key} - {item.selectedPrice.value} €</p>
            )}
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
              <button onClick={() => updateCartItemQuantity(item, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateCartItemQuantity(item, item.quantity + 1)}>+</button>
              <button onClick={() => removeCartItem(item)}>Löschen</button>
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
          Name:
          <input type="text" name="name" value={customerInfo.name} onChange={handleInputChange} />
        </label>
        <label>
          Nachname:
          <input type="text" name="surname" value={customerInfo.surname} onChange={handleInputChange} />
        </label>
        {orderType === 'delivery' && (
          <>
            <label>
              Adresse:
              <input type="text" name="address" value={customerInfo.address} onChange={handleInputChange} />
            </label>
            <label>
              Telefon:
              <input type="text" name="phone" value={customerInfo.phone} onChange={handleInputChange} />
            </label>
            <label>
              Region:
              <select name="region" value={customerInfo.region} onChange={handleInputChange} required>
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
              Zahlungsmethode:
              <select name="paymentMethod" value={customerInfo.paymentMethod} onChange={handleInputChange} required>
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
          <input type="text" name="specialRequest" value={customerInfo.specialRequest} onChange={handleInputChange} />
        </label>
      </div>

      <button className="checkout-button" onClick={handleCheckout}>Bestellung abschließen</button>

      <div className="store-info">
        <h3><strong>Öffnungszeiten:</strong></h3>
        <p>{openingHours}</p>
        <h3><strong>Lieferzeiten:</strong></h3>
        <p>{deliveryHours}</p>
        <h3>Bestellzeit</h3>
        <p>{orderTime}</p>
      </div>
    </div>
  );
};

export default Warenkorb;
