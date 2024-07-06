import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Kontakt from './pages/Kontakt';
import Menu from './pages/Menu';
import Warenkorb from './pages/Warenkorb';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/warenkorb" element={<Warenkorb />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
