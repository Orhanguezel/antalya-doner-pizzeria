import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/HomePage';
import Kontakt from './components/Kontakt';
import Menu from './pages/MenuPage';
import Warenkorb from './pages/Warenkorb';
import AdminPanel from './pages/AdminProfilePage';
import LieferungOrders from './pages/LieferungOrders';
import AbholungOrders from './pages/AbholungOrders';
import RestaurantOrders from './pages/RestaurantOrders';
import Analysis from './pages/Analysis';
import MenuEdit from './pages/MenuEdit';
import Authorization from './pages/Authorization';
import ItemDetail from './pages/ItemDetail';
import CartBar from './components/CartBar'; // CartBar bileşeni eklendi
import AuthPage from './pages/AuthPage'; // AuthPage import edildi
import { AuthProvider } from './context/AuthContext';

const App = () => {
  const [cart, setCart] = useState([]);
  const [userInfo, setUserInfo] = useState(null); // Kullanıcı bilgilerini tutmak için state

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const onAddToCart = (newItem) => {
    const existingItemIndex = cart.findIndex(item => 
      item.nr === newItem.nr && 
      item.selectedPrice.key === newItem.selectedPrice.key &&
      JSON.stringify(item.extras) === JSON.stringify(newItem.extras)
    );
    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += newItem.quantity;
      updatedCart[existingItemIndex].totalPrice += newItem.totalPrice;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...newItem, quantity: newItem.quantity }]);
    }
  };

  const updateCartItemQuantity = (item, newQuantity) => {
    if (newQuantity <= 0) {
      return;
    }
    const updatedCart = cart.map(cartItem => {
      if (
        cartItem.nr === item.nr && 
        cartItem.selectedPrice.key === item.selectedPrice.key && 
        JSON.stringify(cartItem.extras) === JSON.stringify(item.extras)
      ) {
        const basePrice = cartItem.selectedPrice.value + cartItem.extras.reduce((acc, extra) => acc + extra.price, 0);
        return {
          ...cartItem,
          quantity: newQuantity,
          totalPrice: basePrice * newQuantity
        };
      }
      return cartItem;
    });
    setCart(updatedCart);
  };

  const removeCartItem = (item) => {
    setCart(cart.filter(cartItem => 
      cartItem.nr !== item.nr || 
      cartItem.selectedPrice.key !== item.selectedPrice.key ||
      JSON.stringify(cartItem.extras) !== JSON.stringify(item.extras)
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <AuthProvider>
        <Header cart={cart} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/menu" element={<Menu onAddToCart={onAddToCart} />} />
            <Route path="/warenkorb" element={<Warenkorb cart={cart} updateCartItemQuantity={updateCartItemQuantity} removeCartItem={removeCartItem} clearCart={clearCart} />} />
            <Route path="/auth" element={<AuthPage setUserInfo={setUserInfo} />} />  {/* setUserInfo prop olarak geçildi */}
            {/* Admin Panel with Nested Routes */}
            <Route path="/admin/*" element={<AdminPanel />}>
              <Route path="lieferung-orders" element={<LieferungOrders />} />
              <Route path="abholung-orders" element={<AbholungOrders />} />
              <Route path="restaurant-orders" element={<RestaurantOrders />} />
              <Route path="analysis" element={<Analysis />} />
              <Route path="menu-edit" element={<MenuEdit />} />
              <Route path="authorization" element={<Authorization />} />
              <Route path="*" element={<Navigate to="lieferung-orders" />} />
            </Route>
            <Route path="/items/:id" element={<ItemDetail />} />
          </Routes>
        </main>
        <Footer />
        {cart.length > 0 && <CartBar cart={cart} />}
      </AuthProvider>
    </Router>
  );
};

export default App;
