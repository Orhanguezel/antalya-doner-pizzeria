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

  const archiveOrder = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/orders/${id}/complete`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders(orders.map(order => order._id === id ? response.data : order));
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

  const filteredOrders = orders.filter(order => {
    if (filter === 'Gelen Siparişler') return order.status === 'Gelen Siparişler';
    if (filter === 'Hazırlanan Siparişler') return order.status === 'Hazırlanan Siparişler';
    if (filter === 'Taşınan Siparişler') return order.status === 'Taşınan Siparişler';
    if (filter === 'Teslim Edilen Siparişler') return order.status === 'Teslim Edilen Siparişler';
    return false;
  });

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <div className="order-status-buttons">
        <button onClick={() => filterOrders('Gelen Siparişler')}>Gelen Siparişler</button>
        <button onClick={() => filterOrders('Hazırlanan Siparişler')}>Hazırlanan Siparişler</button>
        <button onClick={() => filterOrders('Taşınan Siparişler')}>Taşınan Siparişler</button>
        <button onClick={() => filterOrders('Teslim Edilen Siparişler')}>Teslim Edilen Siparişler</button>
      </div>
      <ul className="order-list">
        {filteredOrders.map(order => (
          <li key={order._id} className="order-card">
            <p><strong>Sipariş ID:</strong> {order._id}</p>
            <p><strong>Sipariş Zamanı:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Müşteri Adı:</strong> {order.customerInfo.name}</p>
            <p><strong>Soyadı:</strong> {order.customerInfo.surname}</p>
            <p><strong>Email:</strong> {order.customerInfo.email}</p>
            <p><strong>Telefon:</strong> {order.customerInfo.phone}</p>
            <p><strong>Adres:</strong> {order.customerInfo.address}</p>
            <p><strong>Bölge:</strong> {order.customerInfo.region}</p>
            <p><strong>Ödeme Yöntemi:</strong> {order.customerInfo.paymentMethod}</p>
            <p><strong>Özel İstek:</strong> {order.customerInfo.specialRequest}</p>
            <h4>Ürünler:</h4>
            <ul className="order-items">
              {order.items.map(item => (
                <li key={item._id}>{item.quantity}x {item.name} - {item.totalPrice}€</li>
              ))}
            </ul>
            <p><strong>Toplam:</strong> {order.total}€</p>
            <div className="order-actions">
              {filter === 'Gelen Siparişler' && <button onClick={() => updateOrderStatus(order._id, 'Hazırlanan Siparişler')}>Hazırla</button>}
              {filter === 'Hazırlanan Siparişler' && <button onClick={() => updateOrderStatus(order._id, 'Taşınan Siparişler')}>Taşımaya</button>}
              {filter === 'Taşınan Siparişler' && <button onClick={() => updateOrderStatus(order._id, 'Teslim Edilen Siparişler')}>Teslim Et</button>}
              {filter !== 'Teslim Edilen Siparişler' && <button onClick={printOrder}>Yazdır</button>}
              {filter === 'Teslim Edilen Siparişler' && (
                <>
                  <button onClick={() => archiveOrder(order._id)}>Arşivle</button>
                  <button onClick={printOrder}>Yazdır</button>
                </>
              )}
              {filter !== 'Teslim Edilen Siparişler' && <button onClick={() => deleteOrder(order._id)}>Sil</button>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
