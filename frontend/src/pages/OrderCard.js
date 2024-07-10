import React from 'react';

const OrderCard = ({ order, onUpdateStatus, onPrint, onDelete }) => {
  const nextStatus = {
    'Gelen Siparişler': 'Hazırlanan Siparişler',
    'Hazırlanan Siparişler': 'Taşınan Siparişler',
    'Taşınan Siparişler': 'Teslim Edilen Siparişler',
    'Teslim Edilen Siparişler': 'Tamamlanan Siparişler'
  };

  const handleNextStatus = () => {
    const newStatus = nextStatus[order.status];
    if (newStatus) {
      onUpdateStatus(order._id, newStatus);
    }
  };

  const orderTypeMap = {
    delivery: 'Lieferung',
    pickup: 'Abholung',
    dinein: 'Im Restaurant essen'
  };

  return (
    <div className="order-card">
      <h3>Bestell-ID: {order._id}</h3>
      <p>Kunde: {order.customerInfo.name} {order.customerInfo.surname}</p>
      <p>Adresse: {order.customerInfo.address}</p>
      <p>Telefon: {order.customerInfo.phone}</p>
      <p>Region: {order.customerInfo.region}</p>
      <p>Zahlungsmethode: {order.customerInfo.paymentMethod}</p>
      <p>Bestellart: {orderTypeMap[order.orderType]}</p>
      <p>Gesamt: {order.total} €</p>
      <p>Status: {order.status}</p>
      <h4>Produkte:</h4>
      <ul>
        {order.items.map((item) => (
          <li key={item._id}>
            {item.name} - {item.quantity} x {item.totalPrice} €
            {item.selectedPrice.key !== 'default' && (
              <p>Größe: {item.selectedPrice.key} - {item.selectedPrice.value} €</p>
            )}
            {item.extras.length > 0 && (
              <ul>
                <li>Extras:</li>
                {item.extras.map((extra, index) => (
                  <li key={index}>{extra.name} (+{extra.price} €)</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <button onClick={handleNextStatus}>Zum nächsten Schritt</button>
      <button onClick={() => onPrint(order._id)}>Drucken</button>
      <button onClick={() => onDelete(order._id)}>Löschen</button>
    </div>
  );
};

export default OrderCard;
