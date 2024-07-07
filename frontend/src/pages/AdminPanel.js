import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './AdminPanel.css';

const AdminPanel = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('eingegangen');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders', {
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

  const filterOrders = (status) => {
    setFilter(status);
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.patch(`/api/orders/${orderId}`, { status }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders(prevOrders => prevOrders.map(order => 
        order._id === orderId ? { ...order, status } : order
      ));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const filteredOrders = orders.filter(order => order.status === filter);

  return (
    <div className="admin-panel">
      <h2>Admin-Panel</h2>
      <div className="order-status-buttons">
        <button onClick={() => filterOrders('eingegangen')}>Eingegangene Bestellungen</button>
        <button onClick={() => filterOrders('in Vorbereitung')}>Vorbereitete Bestellungen</button>
        <button onClick={() => filterOrders('in Lieferung')}>Liefernde Bestellungen</button>
        <button onClick={() => filterOrders('geliefert')}>Gelieferte Bestellungen</button>
      </div>
      <ul className="order-list">
        {filteredOrders.map((order) => (
          <li key={order._id} className="order-item">
            <p><strong>Kunde:</strong> {order.customerInfo.name} {order.customerInfo.surname}</p>
            <p><strong>Adresse:</strong> {order.customerInfo.address}</p>
            <p><strong>Gesamtbetrag:</strong> {order.total} €</p>
            <ul className="order-items">
              {order.items.map((item) => (
                <li key={item._id}>{item.name} - {item.quantity}</li>
              ))}
            </ul>
            <div className="order-actions">
              {order.status !== 'eingegangen' && <button onClick={() => updateOrderStatus(order._id, 'eingegangen')}>Eingegangen</button>}
              {order.status !== 'in Vorbereitung' && <button onClick={() => updateOrderStatus(order._id, 'in Vorbereitung')}>In Vorbereitung</button>}
              {order.status !== 'in Lieferung' && <button onClick={() => updateOrderStatus(order._id, 'in Lieferung')}>In Lieferung</button>}
              {order.status !== 'geliefert' && <button onClick={() => updateOrderStatus(order._id, 'geliefert')}>Geliefert</button>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
