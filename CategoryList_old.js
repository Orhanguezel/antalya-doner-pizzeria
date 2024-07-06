import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            <h2>{category.name}</h2>
            <p>{category.description}</p>
            {category.subcategories && category.subcategories.map((subcategory) => (
              <div key={subcategory._id}>
                <h3>{subcategory.name}</h3>
                <p>{subcategory.description}</p>
                {subcategory.images && subcategory.images.map((image, index) => (
                  <img key={index} src={image} alt={subcategory.name} />
                ))}
                {subcategory.items && subcategory.items.map((item) => (
                  <div key={item._id}>
                    <p>{item.name}</p>
                    <p>{item.description}</p>
                    <p>Price: {item.prices.default}</p>
                    {item.extras && (
                      <div>
                        {item.extras.additional_items && item.extras.additional_items.length > 0 && (
                          <div>
                            <p>Additional Items:</p>
                            <ul>
                              {item.extras.additional_items.map((extraItem, index) => (
                                <li key={index}>{extraItem} - {item.extras.additional_price} €</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {item.extras.premium_items && item.extras.premium_items.length > 0 && (
                          <div>
                            <p>Premium Items:</p>
                            <ul>
                              {item.extras.premium_items.map((premiumItem, index) => (
                                <li key={index}>{premiumItem} - {item.extras.premium_price} €</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
