import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './AdminPanel.css';

const AdminPanel = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('Gelen Siparişler');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [token]);

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders(orders.map(order => (order._id === orderId ? { ...order, status: response.data.status } : order)));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const archiveOrder = async (orderId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/orders/${orderId}/archive`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders(orders.map(order => order._id === orderId ? response.data : order));
    } catch (error) {
      console.error('Error archiving order:', error);
    }
  };

  const printOrder = () => {
    window.print();
  };

  const filterOrders = (status) => {
    setFilter(status);
  };

  const filteredOrders = orders
    .filter(order => {
      if (filter === 'Gelen Siparişler') return order.status === 'Gelen Siparişler';
      if (filter === 'Hazırlanan Siparişler') return order.status === 'Hazırlanan Siparişler';
      if (filter === 'Taşınan Siparişler') return order.status === 'Taşınan Siparişler';
      if (filter === 'Teslim Edilen Siparişler') return order.status === 'Teslim Edilen Siparişler';
      return false;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Ters tarihe göre sıralama

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <div className="order-status-buttons">
        <button onClick={() => filterOrders('Gelen Siparişler')} className={filter === 'Gelen Siparişler' ? 'active' : ''}>In Bestellungen</button>
        <button onClick={() => filterOrders('Hazırlanan Siparişler')} className={filter === 'Hazırlanan Siparişler' ? 'active' : ''}>In Bearbeitung</button>
        <button onClick={() => filterOrders('Taşınan Siparişler')} className={filter === 'Taşınan Siparişler' ? 'active' : ''}>Unterwegs</button>
        <button onClick={() => filterOrders('Teslim Edilen Siparişler')} className={filter === 'Teslim Edilen Siparişler' ? 'active' : ''}>Geliefert</button>
      </div>
      <ul className="order-list">
        {filteredOrders.map(order => (
          <li key={order._id} className="order-card">
            <p><strong>Bestell-ID:</strong> {order._id}</p>
            <p><strong>Bestellzeit:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Kundenname:</strong> {order.customerInfo.name}</p>
            <p><strong>Nachname:</strong> {order.customerInfo.surname}</p>
            <p><strong>Email:</strong> {order.customerInfo.email}</p>
            <p><strong>Telefon:</strong> {order.customerInfo.phone}</p>
            <p><strong>Adresse:</strong> {order.customerInfo.address}</p>
            <p><strong>Region:</strong> {order.customerInfo.region}</p>
            <p><strong>Zahlungsmethode:</strong> {order.customerInfo.paymentMethod}</p>
            <p><strong>Sonderwunsch:</strong> {order.customerInfo.specialRequest}</p>
            <h4>Produkte:</h4>
            <ul className="order-items">
              {order.items.map(item => (
                <li key={item._id}>{item.quantity}x {item.name} - {item.totalPrice}€</li>
              ))}
            </ul>
            <p><strong>Gesamt:</strong> {order.total}€</p>
            <div className="order-actions">
              {filter === 'Gelen Bestellungen' && <button onClick={() => updateOrderStatus(order._id, 'In Bearbeitung')}>In Bearbeitung</button>}
              {filter === 'In Bearbeitung' && <button onClick={() => updateOrderStatus(order._id, 'Unterwegs')}>Unterwegs</button>}
              {filter === 'Unterwegs' && <button onClick={() => updateOrderStatus(order._id, 'Geliefert')}>Geliefert</button>}
              {filter !== 'Geliefert' && <button onClick={printOrder}>Drucken</button>}
              {filter === 'Geliefert' && (
                <>
                  <button onClick={() => archiveOrder(order._id)}>Archivieren</button>
                  <button onClick={printOrder}>Drucken</button>
                </>
              )}
              {filter !== 'Geliefert' && <button onClick={() => deleteOrder(order._id)}>Löschen</button>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
