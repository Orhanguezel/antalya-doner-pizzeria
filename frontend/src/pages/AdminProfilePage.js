import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';
import LieferungOrders from './LieferungOrders';
import AbholungOrders from './AbholungOrders';
import RestaurantOrders from './RestaurantOrders';
import Analysis from './Analysis';
import MenuEdit from './MenuEdit';
import UserManagementPage from './UserManagementPage'; // Doğru bileşeni import edin
import Breadcrumb from '../components/Breadcrumb';
import { useAuth } from '../context/AuthContext';
import './AdminProfilePage.css'; // Doğru CSS dosyasını import edin

const AdminProfilePage = () => {
  const location = useLocation();
  const { token } = useAuth();
  const [orderCounts, setOrderCounts] = useState({
    lieferung: 0,
    abholung: 0,
    restaurant: 0,
  });

  const getActiveClass = (path) => (location.pathname === path ? 'active' : '');

  const [prevOrderCount, setPrevOrderCount] = useState(0);

  useEffect(() => {
    if (Notification.permission !== "granted") {
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
          if (Notification.permission === "granted") {
            new Notification("Yeni Sipariş!", {
              body: "Yeni bir sipariş geldi.",
            });
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

    const intervalId = setInterval(fetchOrderCounts, 30000);

    return () => clearInterval(intervalId);
  }, [token, prevOrderCount]);

  return (
    <div className="admin-panel">
      <h2>Admin Profil Sayfası</h2>
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
        <button className={getActiveClass('/admin/user-management')}>
          <Link to="/admin/user-management">Kullanıcı Yönetimi</Link>
        </button>
      </nav>
      <div className="admin-content">
        <Routes>
          <Route path="/lieferung-orders" element={<LieferungOrders />} />
          <Route path="/abholung-orders" element={<AbholungOrders />} />
          <Route path="/restaurant-orders" element={<RestaurantOrders />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/menu-edit" element={<MenuEdit />} />
          <Route path="/user-management" element={<UserManagementPage />} /> {/* Kullanıcı Yönetimi rotası tanımlandı */}
        </Routes>
      </div>
    </div>
  );
};

export default AdminProfilePage;
