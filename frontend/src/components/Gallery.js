import React from 'react';
import './Gallery.css';

const images = [
  '../assets/gallery/1.jpg',
  '../assets/gallery/2.jpg',
  '../assets/gallery/3.jpg',
  '../assets/gallery/4.jpg',
  '../assets/gallery/5.jpg',
];

function Gallery() {
  return (
    <section id="gallery" className="gallery-section">
      <h2>Galerie</h2>
      <div className="gallery-container">
        {images.map((src, index) => (
          <div className="gallery-item" key={index}>
            <img src={src} alt={`Gallery ${index + 1}`} className="gallery-image animate__animated animate__zoomIn" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
