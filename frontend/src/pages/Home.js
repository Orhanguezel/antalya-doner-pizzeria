import React from 'react';
import Hero from '../components/Hero';
import UnsereSpezialitaten from '../components/Specials';
import Kontakt from '../components/Kontakt';
import Gallery from '../components/Gallery';
import Specials from '../components/Specials';

const Home = () => {
  return (
    <>
      <Hero />
      <Specials />
      <Gallery />
      <Kontakt />
    </>
  );
};

export default Home;
