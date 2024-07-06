import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

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

  return (
    <div>
      <h2>Admin Panel</h2>
      <ul>
        {orders.map((order) => (
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
