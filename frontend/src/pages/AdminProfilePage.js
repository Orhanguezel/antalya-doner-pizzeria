import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'; // useNavigate'i import ettik
import axios from 'axios';
import LieferungOrders from './LieferungOrders';
import AbholungOrders from './AbholungOrders';
import RestaurantOrders from './RestaurantOrders';
import Analysis from './Analysis';
import MenuEdit from './MenuEdit';
import UserManagementPage from './UserManagementPage';
import Breadcrumb from '../components/Breadcrumb';
import { useAuth } from '../context/AuthContext';
import './AdminProfilePage.css';

const AdminProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate hook'unu tanımladık
  const { token } = useAuth();
  const [orderCounts, setOrderCounts] = useState({
    lieferung: 0,
    abholung: 0,
    restaurant: 0,
  });

  const getActiveClass = (path) => (location.pathname === path ? 'active' : '');

  const [prevOrderCount, setPrevOrderCount] = useState(0);

  useEffect(() => {
    // İlk yüklemede "Lieferung" sekmesine yönlendirme yapıyoruz
    if (location.pathname === '/admin') {
      navigate('/admin/lieferung-orders');
    }

    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, [location.pathname, navigate]);

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
            new Notification("Neue Bestellung!", {
              body: "Eine neue Bestellung ist eingegangen.",
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
      <h2>Admin Panel</h2>
      <Breadcrumb /> {/* Breadcrumb bileşeni burada kalıyor */}
      <nav className="admin-nav">
        <Link to="/admin/lieferung-orders" className={`nav-links ${getActiveClass('/admin/lieferung-orders')}`}>
          Lieferung ({orderCounts.lieferung})
        </Link>
        <Link to="/admin/abholung-orders" className={`nav-links ${getActiveClass('/admin/abholung-orders')}`}>
          Abholung ({orderCounts.abholung})
        </Link>
        <Link to="/admin/restaurant-orders" className={`nav-links ${getActiveClass('/admin/restaurant-orders')}`}>
          Im Restaurant ({orderCounts.restaurant})
        </Link>
        <Link to="/admin/analysis" className={`nav-links ${getActiveClass('/admin/analysis')}`}>
          Analyse
        </Link>
        <Link to="/admin/menu-edit" className={`nav-links ${getActiveClass('/admin/menu-edit')}`}>
          Menü
        </Link>
        <Link to="/admin/user-management" className={`nav-links ${getActiveClass('/admin/user-management')}`}>
          Benutzerverwaltung
        </Link>
      </nav>
      <div className="admin-content">
        <Routes>
          <Route path="/lieferung-orders" element={<LieferungOrders />} />
          <Route path="/abholung-orders" element={<AbholungOrders />} />
          <Route path="/restaurant-orders" element={<RestaurantOrders />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/menu-edit" element={<MenuEdit />} />
          <Route path="/user-management" element={<UserManagementPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminProfilePage;
