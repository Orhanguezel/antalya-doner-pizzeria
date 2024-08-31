import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumb.css';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((item) => item && item !== 'admin'); // "admin" tekrarını engeller

  const formatPathname = (name) => {
    switch (name) {
      case 'lieferung-orders':
        return 'Lieferung';
      case 'abholung-orders':
        return 'Abholung';
      case 'restaurant-orders':
        return 'Im Restaurant';
      case 'analysis':
        return 'Analyse';
      case 'menu-edit':
        return 'Menü';
      case 'user-management':
        return 'Benutzerverwaltung';
      default:
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
  };

  return (
    <nav aria-label="breadcrumb" className="breadcrumb-container">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/admin" className="breadcrumb-link">Admin Panel</Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/admin/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={name} className={`breadcrumb-item ${isLast ? 'breadcrumb-active' : ''}`}>
              {isLast ? (
                <span>{formatPathname(name)}</span>
              ) : (
                <Link to={routeTo} className="breadcrumb-link">
                  {formatPathname(name)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
