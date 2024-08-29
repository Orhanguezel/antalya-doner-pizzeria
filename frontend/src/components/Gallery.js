import React from 'react';
import image1 from '../assets/home/9.jpg';
import image2 from '../assets/home/14.jpg';
import image3 from '../assets/home/11.jpg';
import image4 from '../assets/home/10.jpg';
import image5 from '../assets/home/1.jpg';
import './Gallery.css';

const Gallery = () => {
  return (
    <section id="gallery" className="gallery">
      <h1>Galerie</h1>
      <p>Unsere besten Momente und Speisen.</p>
      <div className="gallery-container">
        <div className="gallery-item">
          <img src={image1} alt="Leckeres Gericht 1" />
        </div>
        <div className="gallery-item">
          <img src={image2} alt="Leckeres Gericht 2" />
        </div>
        <div className="gallery-item">
          <img src={image3} alt="Leckeres Gericht 3" />
        </div>
        <div className="gallery-item">
          <img src={image4} alt="Leckeres Gericht 4" />
        </div>
        <div className="gallery-item">
          <img src={image5} alt="Leckeres Gericht 5" />
        </div>
      </div>
    </section>
  );
};

export default Gallery;
