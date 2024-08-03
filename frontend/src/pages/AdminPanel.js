import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';
import LieferungOrders from './LieferungOrders';
import AbholungOrders from './AbholungOrders';
import RestaurantOrders from './RestaurantOrders';
import Analysis from './Analysis';
import MenuEdit from './MenuEdit';
import Authorization from './Authorization';
import Breadcrumb from '../components/Breadcrumb';
import { useAuth } from '../context/AuthContext';
import './AdminPanel.css';

const AdminPanel = () => {
  const location = useLocation();
  const { user, token } = useAuth();
  const [orderCounts, setOrderCounts] = useState({
    lieferung: 0,
    abholung: 0,
    restaurant: 0,
  });

  const getActiveClass = (path) => (location.pathname === path ? 'active' : '');

  const [prevOrderCount, setPrevOrderCount] = useState(0);

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const fetchOrderCounts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const orders = response.data;
        const newOrderCount = orders.length;

        if (newOrderCount > prevOrderCount) {
          if (Notification.permission === 'granted') {
            new Notification('Yeni Sipariş!', {
              body: 'Yeni bir sipariş geldi.',
            });
            const audio = new Audio('/notification_sound.mp3');
            audio.play().catch((error) => console.error('Audio play error:', error));
          }
        }
        setPrevOrderCount(newOrderCount);

        const lieferungCount = orders.filter(order => order.orderType === 'delivery' && !order.archived).length;
        const abholungCount = orders.filter(order => order.orderType === 'pickup' && !order.archived).length;
        const restaurantCount = orders.filter(order => order.orderType === 'dinein' && !order.archived).length;

        setOrderCounts({
          lieferung: lieferungCount,
          abholung: abholungCount,
          restaurant: restaurantCount,
        });
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    // 30 saniyede bir yeni siparişleri kontrol et
    const intervalId = setInterval(() => {
      if (location.pathname.includes('/admin')) {
        fetchOrderCounts();
      }
    }, 30000);

    // Bileşen temizlendiğinde intervali temizle
    return () => clearInterval(intervalId);
  }, [token, prevOrderCount, location.pathname]);

  if (!user || user.role !== 'admin') {
    return <p>Access denied. Admins only.</p>;
  }

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <Breadcrumb />
      <nav className="admin-nav">
        <button className={getActiveClass('/admin/lieferung-orders')}>
          <Link to="/admin/lieferung-orders">Lieferung ({orderCounts.lieferung})</Link>
        </button>
        <button className={getActiveClass('/admin/abholung-orders')}>
          <Link to="/admin/abholung-orders">Abholung ({orderCounts.abholung})</Link>
        </button>
        <button className={getActiveClass('/admin/restaurant-orders')}>
          <Link to="/admin/restaurant-orders">Im Restaurant ({orderCounts.restaurant})</Link>
        </button>
        <button className={getActiveClass('/admin/analysis')}>
          <Link to="/admin/analysis">Analiz</Link>
        </button>
        <button className={getActiveClass('/admin/menu-edit')}>
          <Link to="/admin/menu-edit">Menü</Link>
        </button>
        <button className="disabled" disabled>
          Auth
        </button>
      </nav>
      <div className="admin-content">
        <Routes>
          <Route path="/lieferung-orders" element={<LieferungOrders />} />
          <Route path="/abholung-orders" element={<AbholungOrders />} />
          <Route path="/restaurant-orders" element={<RestaurantOrders />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/menu-edit" element={<MenuEdit />} />
          <Route path="/authorization" element={<Authorization />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;
