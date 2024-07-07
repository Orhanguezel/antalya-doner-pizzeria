import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Kontakt from './pages/Kontakt';
import Menu from './pages/Menu';
import Warenkorb from './pages/Warenkorb';
import Auth from './pages/Auth'; // Bu satırı ekliyoruz
import AdminPanel from './pages/AdminPanel';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  const [cart, setCart] = useState([]);

  // Component mount olduğunda localStorage'dan cart bilgisini yükle
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Cart değiştiğinde localStorage'a kaydet
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
      updatedCart[existingItemIndex].quantity += 1;
      updatedCart[existingItemIndex].totalPrice += newItem.totalPrice;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...newItem, quantity: 1 }]);
    }
  };

  const updateCartItemQuantity = (item, newQuantity) => {
    if (newQuantity <= 0) {
      return;
    }
    const updatedCart = cart.map(cartItem => {
      if (cartItem.nr === item.nr && cartItem.selectedPrice.key === item.selectedPrice.key && JSON.stringify(cartItem.extras) === JSON.stringify(item.extras)) {
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
    <AuthProvider>
      <Router>
        <Header cart={cart} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/menu" element={<Menu onAddToCart={onAddToCart} />} />
            <Route path="/warenkorb" element={<Warenkorb cart={cart} updateCartItemQuantity={updateCartItemQuantity} removeCartItem={removeCartItem} clearCart={clearCart} />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
