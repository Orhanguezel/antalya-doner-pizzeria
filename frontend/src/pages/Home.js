import React from 'react';
import Hero from '../components/Hero';
import Specials from '../components/Specials';
import Gallery from '../components/Gallery';
import Kontakt from '../pages/Kontakt';
import './Home.css';

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
