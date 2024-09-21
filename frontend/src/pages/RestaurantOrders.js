import React, { useEffect, useState } from 'react';
import api from '../axios'; // axios instance'ı kullanıyoruz
import './RestaurantOrders.css';
import { useAuth } from '../context/AuthContext';

const RestaurantOrders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('Eingehende Bestellungen');
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // api instance'ı üzerinden GET isteği yapıyoruz
        const response = await api.get('/orders', {
          headers: {
            Authorization: `Bearer ${token}` // Token ekleniyor
          }
        });
        setOrders(response.data); // Gelen veriyi state'e kaydediyoruz
      } catch (error) {
        console.error('Fehler beim Abrufen der Bestellungen:', error);
      }
    };

    fetchOrders();
  }, [token]);

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await api.put(`/orders/${orderId}/status`, { status }, {
        headers: {
          Authorization: `Bearer ${token}` // Token ekleniyor
        }
      });
      setOrders(orders.map(order => (order._id === orderId ? { ...order, status: response.data.status } : order)));
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Bestellstatus:', error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await api.delete(`/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}` // Token ekleniyor
        }
      });
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Fehler beim Löschen der Bestellung:', error);
    }
  };

  const archiveOrder = async (orderId) => {
    try {
      const response = await api.put(`/orders/${orderId}/archive`, null, {
        headers: {
          Authorization: `Bearer ${token}` // Token ekleniyor
        }
      });
      setOrders(orders.map(order => order._id === orderId ? response.data : order));
    } catch (error) {
      console.error('Fehler beim Archivieren der Bestellung:', error);
    }
  };

  const printOrder = (orderId) => {
    const orderElement = document.getElementById(`order-${orderId}`);
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Bestellung</title>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(orderElement.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  const filterOrders = (status) => {
    setFilter(status);
  };

  const filteredOrders = orders
    .filter(order => order.orderType === 'dinein') // 'Im Restaurant essen' olan siparişleri filtreliyoruz
    .filter(order => {
      if (filter === 'Eingehende Bestellungen') return order.status === 'Eingehende Bestellungen';
      if (filter === 'Bestellungen in Vorbereitung') return order.status === 'Bestellungen in Vorbereitung';
      if (filter === 'Gelieferte Bestellungen') return order.status === 'Gelieferte Bestellungen';
      return false;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const orderTypeMap = {
    delivery: 'Lieferung',
    pickup: 'Abholung',
    dinein: 'Im Restaurant essen'
  };

  return (
    <div className="restaurant-orders">
      <h3>Im Restaurant Bestellungen</h3>
      <div className="order-status-buttons">
        <button 
          onClick={() => filterOrders('Eingehende Bestellungen')} 
          className={filter === 'Eingehende Bestellungen' ? 'active' : ''}
        >
          Eingehende
        </button>
        <button 
          onClick={() => filterOrders('Bestellungen in Vorbereitung')} 
          className={filter === 'Bestellungen in Vorbereitung' ? 'active' : ''}
        >
          Vorbereitete
        </button>
        <button 
          onClick={() => filterOrders('Gelieferte Bestellungen')} 
          className={filter === 'Gelieferte Bestellungen' ? 'active' : ''}
        >
          Serviert
        </button>
      </div>
      <ul className="order-list">
        {filteredOrders.map(order => (
          <li key={order._id} id={`order-${order._id}`} className="order-card">
            <p><strong>Bestell-ID:</strong> {order._id}</p>
            <p><strong>Bestellzeit:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Kunde:</strong> {order.customerInfo.name} {order.customerInfo.surname}</p>
            {order.customerInfo.email && <p><strong>Email:</strong> {order.customerInfo.email}</p>}
            {order.customerInfo.phone && <p><strong>Telefon:</strong> {order.customerInfo.phone}</p>}
            {order.customerInfo.address && <p><strong>Adresse:</strong> {order.customerInfo.address}</p>}
            {order.customerInfo.region && <p><strong>Region:</strong> {order.customerInfo.region}</p>}
            {order.customerInfo.paymentMethod && <p><strong>Zahlungsmethode:</strong> {order.customerInfo.paymentMethod}</p>}
            <p><strong>Bestellart:</strong> {orderTypeMap[order.orderType]}</p>
            {order.customerInfo.specialRequest && <p><strong>Besondere Wünsche:</strong> {order.customerInfo.specialRequest}</p>}
            <h4>Produkte:</h4>
            <ul className="order-items">
              {order.items.map(item => (
                <li key={item._id}>
                  <h4>{item.quantity} x {item.nr ? `${item.nr}. ` : ''}{item.name} {item.selectedPrice.key === 'default' ? `${item.selectedPrice.value.toFixed(2)} €` : `${item.selectedPrice.key} - ${item.selectedPrice.value.toFixed(2)} €`}</h4>
                  {item.extras && item.extras.length > 0 && (
                    <>
                      <p>Extras:</p>
                      <ul>
                        {item.extras.map((extra, index) => (
                          <li key={index}>{extra.name} (+{extra.price.toFixed(2)} €)</li>
                        ))}
                      </ul>
                    </>
                  )}
                  <p>Gesamtpreis: {item.totalPrice.toFixed(2)} €</p>
                </li>
              ))}
            </ul>
            <p><strong>Gesamt:</strong> {order.total.toFixed(2)} €</p>
            <p><strong>Status:</strong> {order.status}</p>
            <div className="order-actions">
              {filter === 'Eingehende Bestellungen' && (
                <button onClick={() => updateOrderStatus(order._id, 'Bestellungen in Vorbereitung')}>
                  Vorbereiten
                </button>
              )}
              {filter === 'Bestellungen in Vorbereitung' && (
                <button onClick={() => updateOrderStatus(order._id, 'Gelieferte Bestellungen')}>
                  Servieren
                </button>
              )}
              {filter === 'Gelieferte Bestellungen' && (
                <>
                  <button onClick={() => archiveOrder(order._id)}>Archivieren</button>
                  <button onClick={() => printOrder(order._id)}>Drucken</button>
                </>
              )}
              {filter !== 'Gelieferte Bestellungen' && (
                <button onClick={() => setConfirmDelete(order._id)}>Löschen</button>
              )}
            </div>
            {confirmDelete === order._id && (
              <div className="confirm-delete">
                <p>Möchten Sie diese Bestellung wirklich löschen?</p>
                <button onClick={() => deleteOrder(order._id)}>Ja</button>
                <button onClick={() => setConfirmDelete(null)}>Nein</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantOrders;
