import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Kontakt from './pages/Kontakt';
import Menu from './pages/Menu';
import Warenkorb from './pages/Warenkorb';
import AuthPage from './pages/AuthPage';
import AdminPanel from './pages/AdminPanel';
import Profile from './pages/Profile';
import LieferungOrders from './pages/LieferungOrders';
import AbholungOrders from './pages/AbholungOrders';
import RestaurantOrders from './pages/RestaurantOrders';
import Analysis from './pages/Analysis';
import MenuEdit from './pages/MenuEdit';
import Authorization from './pages/Authorization';
import { AuthProvider, useAuth } from './context/AuthContext';
import CartBar from './components/CartBar';
import ItemDetail from './pages/ItemDetail';

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/auth" />;
};

const AdminRoute = ({ element }) => {
  const { user } = useAuth();
  return user && user.role === 'admin' ? element : <Navigate to="/auth" />;
};

const App = () => {
  const [cart, setCart] = useState([]);

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
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/admin/*" element={<AdminRoute element={<AdminPanel />} />}>
              <Route path="*" element={<Navigate to="/admin/lieferung-orders" />} />
            </Route>
            <Route path="/admin/lieferung-orders" element={<AdminRoute element={<LieferungOrders />} />} />
            <Route path="/admin/abholung-orders" element={<AdminRoute element={<AbholungOrders />} />} />
            <Route path="/admin/restaurant-orders" element={<AdminRoute element={<RestaurantOrders />} />} />
            <Route path="/admin/analysis" element={<AdminRoute element={<Analysis />} />} />
            <Route path="/admin/menu-edit" element={<AdminRoute element={<MenuEdit />} />} />
            <Route path="/admin/authorization" element={<AdminRoute element={<Authorization />} />} />
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
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
