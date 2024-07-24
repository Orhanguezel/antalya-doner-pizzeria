import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import './Menu.css';
import { zusatztoffeMap, allergeneMap } from '../constants';
import api from '../api/axios';
import { calculateTotal } from '../utils/cart-utils';

Modal.setAppElement('#root');

const Menu = ({ onAddToCart, cart = [] }) => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [activeSubcategory, setActiveSubcategory] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [extras, setExtras] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [infoItem, setInfoItem] = useState(null);

  const { categoryId, subcategoryId } = useParams();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        console.log('Fetch response:', response);

        const data = response.data;
        console.log('Fetched data:', data);
        setCategories(data);

        if (categoryId) {
          setActiveCategory(categoryId);
          if (subcategoryId) {
            setActiveSubcategory(subcategoryId);
          } else {
            const category = data.find(cat => cat._id === categoryId);
            if (category && category.subcategories.length > 0) {
              setActiveSubcategory(category.subcategories[0]._id);
            }
          }
        } else if (data.length > 0) {
          setActiveCategory(data[0]._id);
          if (data[0].subcategories.length > 0) {
            setActiveSubcategory(data[0].subcategories[0]._id);
          }
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [categoryId, subcategoryId]);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    const defaultPriceKey = Object.keys(item.prices)[0];
    setSelectedPrice({ key: defaultPriceKey, value: item.prices[defaultPriceKey] });
    setExtras([]);
    setTotalPrice(item.prices[defaultPriceKey]);
    setQuantity(1);
  };

  const handleExtraChange = (extraName, extraPrice, isChecked) => {
    const newExtras = [...extras];
    if (isChecked) {
      newExtras.push({ name: extraName, price: extraPrice });
    } else {
      const index = newExtras.findIndex((extra) => extra.name === extraName);
      newExtras.splice(index, 1);
    }
    setExtras(newExtras);

    const newTotalPrice = newExtras.reduce((acc, curr) => acc + curr.price, selectedPrice.value * quantity);
    setTotalPrice(newTotalPrice);
  };

  const handlePriceChange = (priceKey, priceValue) => {
    setSelectedPrice({ key: priceKey, value: priceValue });
    const newTotalPrice = extras.reduce((acc, curr) => acc + curr.price, priceValue * quantity);
    setTotalPrice(newTotalPrice);
  };

  const handleAddToCart = () => {
    const newItem = {
      ...selectedItem,
      selectedPrice,
      extras,
      totalPrice,
      quantity,
      itemDetails: { 
        name: selectedItem.name,
        nr: selectedItem.nr,
        description: selectedItem.description,
        prices: selectedItem.prices,
        extras: selectedItem.extras,
      }
    };
    onAddToCart(newItem);
    setSelectedItem(null);
  };

  const handleInfoClick = (item) => {
    setInfoItem(item);
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    setTotalPrice(selectedPrice.value * newQuantity + extras.reduce((acc, curr) => acc + curr.price * newQuantity, 0));
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      setTotalPrice(selectedPrice.value * newQuantity + extras.reduce((acc, curr) => acc + curr.price * newQuantity, 0));
    }
  };

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1 className="menu-title">Speisekarte</h1>
        <p>Sie können jetzt online bestellen und bei Lieferung bezahlen. Kreditkarten werden akzeptiert.</p>
      </div>
      <div className="categories-container">
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => setActiveCategory(category._id)}
            className={activeCategory === category._id ? 'category-button active' : 'category-button'}
          >
            <i className={`fas fa-${category.icon}`}></i> {category.name}
          </button>
        ))}
      </div>
      <div>
        {categories
          .filter((category) => category._id === activeCategory)
          .map((category) => (
            <div key={category._id}>
              {category.subcategories.map((subcategory) => (
                <div key={subcategory._id}>
                  {category.name.toLowerCase() !== 'sparmenus' && (
                    <React.Fragment>
                      <h3>{subcategory.name}</h3>
                      <p>{subcategory.description}</p>
                      {subcategory.images && (
                        <div className="subcategory-images">
                          {subcategory.images.map((image, index) => (
                            <img key={index} src={image} alt={`Subcategory ${index}`} style={{ width: '50%' }} />
                          ))}
                        </div>
                      )}
                    </React.Fragment>
                  )}
                  <div className="items-container">
                    {subcategory.items.map((item) => (
                      <div className="card" key={item._id}>
                        {category.name.toLowerCase() === 'sparmenus' && item.image && (
                          <img src={item.image} alt={item.name} className="card-image-top" />
                        )}
                        <div className="card-header">
                          <button className="info-button" onClick={() => handleInfoClick(item)}>i</button>
                          <h4>{item.nr}. {item.name}</h4>
                          <p>Preis: {Math.min(...Object.values(item.prices))} €</p>
                          <button className="add-button" onClick={() => handleSelectItem(item)}>+</button>
                        </div>
                        <p>{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
      {selectedItem && (
        <Modal isOpen={!!selectedItem} onRequestClose={() => setSelectedItem(null)} className="modal">
          <h2>{selectedItem.nr}. {selectedItem.name}</h2>
          <p>{selectedItem.description}</p>
          {Object.keys(selectedItem.prices).length > 1 ? (
            <div>
              <p>Preisoptionen:</p>
              {Object.entries(selectedItem.prices).map(([key, value]) => (
                <div key={key} className="extra-item">
                  <input
                    type="radio"
                    id={`price-${key}`}
                    name="price"
                    value={value}
                    checked={selectedPrice.key === key}
                    onChange={() => handlePriceChange(key, value)}
                  />
                  <label htmlFor={`price-${key}`}>{key}: {value} €</label>
                </div>
              ))}
            </div>
          ) : (
            <p>Preis: {selectedPrice.value} €</p>
          )}
          {selectedItem.extras && Object.keys(selectedItem.extras).length > 0 && (
            <div className="extras-container">
              <p>Extras:</p>
              <div className="extras-list">
                {Object.entries(selectedItem.extras).map(([extraName, extraPrice], index) => (
                  <div key={index} className="extra-item">
                    <input
                      type="checkbox"
                      id={`extra-${extraName}`}
                      onChange={(e) => handleExtraChange(extraName, extraPrice, e.target.checked)}
                    />
                    <label htmlFor={`extra-${extraName}`}>{extraName.replace(/([a-z])([A-Z])/g, '$1 $2')} (+{extraPrice} €)</label>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="quantity-controls">
            <button onClick={decreaseQuantity} disabled={quantity <= 1}>-</button>
            <span>{quantity}</span>
            <button onClick={increaseQuantity}>+</button>
          </div>
          <h3>Gesamtpreis: {totalPrice.toFixed(2)} €</h3>
          <button className="add-to-cart-button" onClick={handleAddToCart}>In den Warenkorb</button>
          <button className="close-button" onClick={() => setSelectedItem(null)}>Schließen</button>
        </Modal>
      )}
      {infoItem && (
        <Modal isOpen={!!infoItem} onRequestClose={() => setInfoItem(null)} className="modal">
          <h2>{infoItem.nr}. {infoItem.name}</h2>
          <p>{infoItem.description}</p>
          {infoItem.zusatztoffe && infoItem.zusatztoffe.length > 0 && (
            <div>
              <p>Zusatzstoffe:</p>
              <ul>
                {infoItem.zusatztoffe.map((code) => (
                  <li key={code}>{zusatztoffeMap[code]}</li>
                ))}
              </ul>
            </div>
          )}
          {infoItem.allergene && infoItem.allergene.length > 0 && (
            <div>
              <p>Allergene:</p>
              <ul>
                {infoItem.allergene.map((code) => (
                  <li key={code}>{allergeneMap[code]}</li>
                ))}
              </ul>
            </div>
          )}
          <button className="close-button" onClick={() => setInfoItem(null)}>Schließen</button>
        </Modal>
      )}
    </div>
  );
};

export default Menu;
