import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { token } = useAuth();
  const [orderCounts, setOrderCounts] = useState({
    lieferung: 0,
    abholung: 0,
    restaurant: 0,
  });

  const getActiveClass = (path) => (location.pathname === path ? 'active' : '');

  const [prevOrderCount, setPrevOrderCount] = useState(0);

  // İlk yüklemede yönlendirme ve izin isteği
  useEffect(() => {
    // İlk yüklemede "Lieferung" sekmesine yönlendirme yapıyoruz
    if (location.pathname === '/admin') {
      console.log("Navigating to Lieferung Orders");
      navigate('/admin/lieferung-orders');
    }

    if (Notification.permission !== "granted") {
      console.log("Requesting notification permission...");
      Notification.requestPermission();
    }
  }, [location.pathname, navigate]);

  // Bildirim sesi çalma fonksiyonu
  const playNotificationSound = () => {
    const audio = new Audio('/assets/sounds/notification.mp3'); // Doğru yol
    audio.play()
      .then(() => {
        console.log('Bildirim sesi başarıyla çalındı.');
      })
      .catch(error => console.error("Ses çalma başarısız oldu:", error));
  };

  // Sipariş sayısını çekmek için fonksiyon
  const fetchOrderCounts = async () => {
    try {
      console.log('Fetching orders...');
      
      const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';  // Doğru tanımlama
      console.log('API URL:', apiUrl);
  
      const response = await axios.get(`${apiUrl}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const orders = response.data;
      console.log('Fetched Orders:', orders);  // Sipariş verilerini kontrol edin

      const newOrderCount = orders.length;
      console.log('Yeni sipariş sayısı:', newOrderCount);

      // Yeni sipariş varsa bildirim gönder
      if (newOrderCount > prevOrderCount) {
        if (Notification.permission === "granted") {
          console.log("Bildirim gönderiliyor...");
          new Notification("Neue Bestellung!", {
            body: "Eine neue Bestellung ist eingegangen.",
          });
          playNotificationSound(); // Bildirimle birlikte sesi çal
        }
      }

      setPrevOrderCount(newOrderCount);

      // Sipariş sayısını güncelleme (archived olmayanları say)
      const lieferungCount = orders.filter(order => order.orderType === 'delivery' && !order.archived).length;
      const abholungCount = orders.filter(order => order.orderType === 'pickup' && !order.archived).length;
      const restaurantCount = orders.filter(order => order.orderType === 'dinein' && !order.archived).length;

      console.log('Lieferung sayısı:', lieferungCount);
      console.log('Abholung sayısı:', abholungCount);
      console.log('Restoran sayısı:', restaurantCount);

      setOrderCounts({
        lieferung: lieferungCount,
        abholung: abholungCount,
        restaurant: restaurantCount,
      });

    } catch (error) {
      console.error('Siparişler çekilirken hata oluştu:', error);
    }
  };

  // Her 30 saniyede bir siparişleri kontrol et
  useEffect(() => {
    fetchOrderCounts(); // İlk yüklemede siparişleri çek

    const intervalId = setInterval(fetchOrderCounts, 30000); // 30 saniyede bir tekrar kontrol et
    return () => clearInterval(intervalId); // Temizlik için intervali kaldır
  }, [token, prevOrderCount]);

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <Breadcrumb />
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
