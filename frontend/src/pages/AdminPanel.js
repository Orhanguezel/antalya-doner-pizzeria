import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './AdminPanel.css';

const AdminPanel = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');

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

  const filterOrders = (status) => {
    setFilter(status);
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const handleUpdateStatus = async (id, status) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/orders/${id}/status`, { status }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedOrders = orders.map(order => order._id === id ? { ...order, status: response.data.status } : order);
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedOrders = orders.filter(order => order._id !== id);
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handlePrintOrder = (id) => {
    console.log(`Printing order ${id}`);
    // Implement print functionality here
  };

  return (
    <div className="admin-panel">
      <h2>Admin-Panel</h2>
      <div className="order-status-buttons">
        <button onClick={() => filterOrders('Gelen Siparişler')}>Eingegangene Bestellungen</button>
        <button onClick={() => filterOrders('Hazırlanan Siparişler')}>Vorbereitete Bestellungen</button>
        <button onClick={() => filterOrders('Taşınan Siparişler')}>Liefernde Bestellungen</button>
        <button onClick={() => filterOrders('Teslim Edilen Siparişler')}>Gelieferte Bestellungen</button>
      </div>
      <ul className="order-list">
        {filteredOrders.map((order) => (
          <li key={order._id} className="order-card">
            <div className="order-info">
              <div className="order-header">
                <p><strong>Sipariş ID:</strong> {order._id}</p>
                <p><strong>Sipariş Zamanı:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <div className="order-details">
                <p><strong>Müşteri Adı:</strong> {order.customerInfo.name}</p>
                <p><strong>Email:</strong> {order.customerInfo.email || 'N/A'}</p>
                <p><strong>Telefon:</strong> {order.customerInfo.phone || 'N/A'}</p>
                <p><strong>Adres:</strong> {order.customerInfo.address || 'N/A'}</p>
                <p><strong>Bölge:</strong> {order.customerInfo.region || 'N/A'}</p>
                <p><strong>Ödeme Yöntemi:</strong> {order.customerInfo.paymentMethod}</p>
                <p><strong>Sipariş Türü:</strong> {order.orderType}</p>
                <p><strong>Sipariş Durumu:</strong> {order.status}</p>
                <p><strong>Toplam:</strong> {order.total} €</p>
              </div>
              <div className="order-items">
                <p><strong>Ürünler:</strong></p>
                <ul>
                  {order.items.map((item) => (
                    <li key={item._id}>{item.quantity}x {item.name} - {item.totalPrice} €</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="order-actions">
              <button onClick={() => handleUpdateStatus(order._id, 'Hazırlanan Siparişler')}>Hazırla</button>
              <button onClick={() => handleUpdateStatus(order._id, 'Taşınan Siparişler')}>Taşı</button>
              <button onClick={() => handleUpdateStatus(order._id, 'Teslim Edilen Siparişler')}>Teslim Et</button>
              <button onClick={() => handleDeleteOrder(order._id)}>Sil</button>
              <button onClick={() => handlePrintOrder(order._id)}>Yazdır</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
