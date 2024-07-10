import React from 'react';
import './Gallery.css';

const Gallery = () => {
  return (
    <section id="gallery" className="gallery">
      <h2>Galerie</h2>
      <p>Unsere besten Momente und Speisen.</p>
      <div className="gallery-container">
        <img src="../assets/gallery/1.jpg" alt="Gallery Image 1" className="gallery-item" />
        <img src="../assets/gallery/2.jpg" alt="Gallery Image 2" className="gallery-item" />
        <img src="../assets/gallery/3.jpg" alt="Gallery Image 3" className="gallery-item" />
        <img src="../assets/gallery/4.jpg" alt="Gallery Image 4" className="gallery-item" />
        <img src="../assets/gallery/5.jpg" alt="Gallery Image 5" className="gallery-item" />
      </div>
    </section>
  );
};

export default Gallery;
