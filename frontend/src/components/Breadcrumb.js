import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumb.css'; // CSS dosyasını ekleyelim

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((item) => item);

  const formatPathname = (name) => {
    switch (name) {
      case 'admin':
        return 'Admin Panel';
      case 'lieferung-orders':
        return 'Lieferung';
      case 'abholung-orders':
        return 'Abholung';
      case 'restaurant-orders':
        return 'Im Restaurant';
      case 'analysis':
        return 'Analiz';
      case 'menu-edit':
        return 'Menü';
      case 'authorization':
        return 'Auth';
      default:
        return name;
    }
  };

  return (
    <div className="breadcrumb">
      <Link to="/admin" className="breadcrumb-link">Admin Panel</Link>
      {pathnames.map((name, index) => {
        if (name === 'admin') return null;
        const routeTo = `/admin/${pathnames.slice(1, index + 1).join('/')}`;
        return (
          <span key={name} className="breadcrumb-item">
            <span className="breadcrumb-arrow">▶</span>
            {index === pathnames.length - 1 ? (
              <span className="breadcrumb-active">{formatPathname(name)}</span>
            ) : (
              <Link to={routeTo} className="breadcrumb-link">{formatPathname(name)}</Link>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
