import React from 'react';
import Hero from '../components/Hero';
import Specials from '../components/Specials';
import Gallery from '../components/Gallery';
import Kontakt from '../components/Kontakt'; // Doğru yolu belirtiyoruz
import './HomePage.css';

function Home() {
  return (
    <div>
      <Hero />
      <Specials />
      <Gallery />
      <Kontakt />
    </div>
  );
}

export default Home;

