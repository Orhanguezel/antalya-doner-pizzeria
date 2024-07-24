import React from 'react';
import './Gallery.css';

const Gallery = () => {
  return (
    <section id="gallery" className="gallery">
      <h2>Galerie</h2>
      <p>Unsere besten Momente und Speisen.</p>
      <div className="gallery-container">
        <div className="gallery-item">
          <img src="../assets/home/9.jpg" alt="Image 1" />
        </div>
        <div className="gallery-item">
          <img src="../assets/home/14.jpg" alt="Image 2" />
        </div>
        <div className="gallery-item">
          <img src="../assets/home/11.jpg" alt="Image 3" />
        </div>
        <div className="gallery-item">
          <img src="../assets/home/10.jpg" alt="Image 4" />
        </div>
        <div className="gallery-item">
          <img src="../assets/home/1.jpg" alt="Image 5" />
        </div>
      </div>
    </section>
  );
};

export default Gallery;
