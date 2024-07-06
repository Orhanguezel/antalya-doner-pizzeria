import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import './Menu.css';

function Menu() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="menu">
      <h1>Unser Menu</h1>
      {categories.map((category) => (
        <div key={category._id} className="category">
          <h2>{category.name}</h2>
          <p>{category.description}</p>
          {category.subcategories.map((subcategory) => (
            <div key={subcategory._id} className="subcategory">
              <h3>{subcategory.name}</h3>
              <p>{subcategory.description}</p>
              {subcategory.images.map((image, index) => (
                <img key={index} src={image} alt={subcategory.name} />
              ))}
              <div className="items">
                {subcategory.items.map((item) => (
                  <div key={item._id} className="item">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <p>Price: {item.prices.default} €</p>
                    <button>In den Warenkorb</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Menu;
