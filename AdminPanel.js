import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');

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

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  return (
    <div>
      <h2>Admin-Panel</h2>
      <div className="order-status-buttons">
        <button onClick={() => filterOrders('received')}>Eingegangene Bestellungen</button>
        <button onClick={() => filterOrders('preparing')}>Vorbereitete Bestellungen</button>
        <button onClick={() => filterOrders('on_delivery')}>Liefernde Bestellungen</button>
        <button onClick={() => filterOrders('delivered')}>Gelieferte Bestellungen</button>
      </div>
      <ul>
        {filteredOrders.map((order) => (
          <li key={order._id}>
            <p>{order.customerInfo.name} {order.customerInfo.surname}</p>
            <p>{order.customerInfo.address}</p>
            <p>{order.total} €</p>
            <ul>
              {order.items.map((item) => (
                <li key={item._id}>{item.name} - {item.quantity}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
