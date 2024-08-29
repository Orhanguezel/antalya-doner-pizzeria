import React from 'react';
import ReactDOM from 'react-dom/client'; // 'react-dom' yerine 'react-dom/client' kullanılıyor
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // createRoot kullanılıyor
root.render(
  // <React.StrictMode>  // Bunu kaldırarak StrictMode'u devre dışı bırakıyoruz
    <App />
  // </React.StrictMode>  // Bunu kaldırarak StrictMode'u devre dışı bırakıyoruz
);
