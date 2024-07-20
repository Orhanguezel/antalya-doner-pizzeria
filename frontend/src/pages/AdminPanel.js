import React from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import LieferungOrders from './LieferungOrders';
import AbholungOrders from './AbholungOrders';
import RestaurantOrders from './RestaurantOrders';
import Analysis from './Analysis';
import MenuEdit from './MenuEdit';
import Authorization from './Authorization';
import Breadcrumb from '../components/Breadcrumb';
import './AdminPanel.css';

const AdminPanel = () => {
  const location = useLocation();
  const getActiveClass = (path) => (location.pathname === path ? 'active' : '');

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <Breadcrumb />
      <nav className="admin-nav">
        <button className={getActiveClass('/admin/lieferung-orders')}>
          <Link to="/admin/lieferung-orders">Lieferung</Link>
        </button>
        <button className={getActiveClass('/admin/abholung-orders')}>
          <Link to="/admin/abholung-orders">Abholung</Link>
        </button>
        <button className={getActiveClass('/admin/restaurant-orders')}>
          <Link to="/admin/restaurant-orders">Im Restaurant</Link>
        </button>
        <button className={getActiveClass('/admin/analysis')}>
          <Link to="/admin/analysis">Analiz</Link>
        </button>
        <button className={getActiveClass('/admin/menu-edit')}>
          <Link to="/admin/menu-edit">Menü</Link>
        </button>
        <button className={getActiveClass('/admin/authorization')}>
          <Link to="/admin/authorization">Auth</Link>
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
