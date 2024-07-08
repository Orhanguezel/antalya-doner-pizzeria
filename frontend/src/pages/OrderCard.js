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

  return (
    <div className="order-card">
      <h3>Sipariş ID: {order._id}</h3>
      <p>Müşteri: {order.customerInfo.name} {order.customerInfo.surname}</p>
      <p>Adres: {order.customerInfo.address}</p>
      <p>Telefon: {order.customerInfo.phone}</p>
      <p>Bölge: {order.customerInfo.region}</p>
      <p>Ödeme Yöntemi: {order.customerInfo.paymentMethod}</p>
      <p>Toplam: {order.total} €</p>
      <p>Durum: {order.status}</p>
      <ul>
        {order.items.map((item) => (
          <li key={item._id}>{item.name} - {item.quantity} x {item.totalPrice} €</li>
        ))}
      </ul>
      <button onClick={handleNextStatus}>Sonraki Aşamaya Gönder</button>
      <button onClick={() => onPrint(order._id)}>Yazdır</button>
      <button onClick={() => onDelete(order._id)}>Sil</button>
    </div>
  );
};

export default OrderCard;
