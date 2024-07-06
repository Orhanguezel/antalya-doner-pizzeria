import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './Menu.css';
import { zusatztoffeMap, allergeneMap } from '../constants'; // Sabitleri içe aktar

Modal.setAppElement('#root');

const Menu = ({ onAddToCart }) => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [extras, setExtras] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [infoItem, setInfoItem] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data);
        if (data.length > 0) {
          setActiveCategory(data[0]._id);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

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
    <div>
      <h1>Unser Menü</h1>
      <div>
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => setActiveCategory(category._id)}
            className={activeCategory === category._id ? 'category-button active' : 'category-button'}
          >
            {category.name}
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
                  <h3>{subcategory.name}</h3>
                  <p>{subcategory.description}</p>
                  {subcategory.images && (
                    <div className="subcategory-images">
                      {subcategory.images.map((image, index) => (
                        <img key={index} src={image} alt={`Subcategory ${index}`} style={{ width: '50%' }} />
                      ))}
                    </div>
                  )}
                  <div className="items-container">
                    {subcategory.items.map((item) => (
                      <div className="card" key={item._id}>
                        <h4>{item.nr}. {item.name}</h4>
                        {(item.zusatztoffe && item.zusatztoffe.length > 0) || (item.allergene && item.allergene.length > 0) ? (
                          <button className="info-button" onClick={() => handleInfoClick(item)}>i</button>
                        ) : null}
                        <p>{item.description}</p>
                        <p>Preis: {Math.min(...Object.values(item.prices))} €</p>
                        <button className="add-button" onClick={() => handleSelectItem(item)}>+</button>
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
                <div key={key}>
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
          {selectedItem.extras && (
            <div>
              <p>Ekstralar:</p>
              {Object.entries(selectedItem.extras).map(([extraName, extraPrice], index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    id={`extra-${extraName}`}
                    onChange={(e) => handleExtraChange(extraName, extraPrice, e.target.checked)}
                  />
                  <label htmlFor={`extra-${extraName}`}>{extraName.replace(/([a-z])([A-Z])/g, '$1 $2')} (+{extraPrice} €)</label>
                </div>
              ))}
            </div>
          )}
          <div className="quantity-controls">
            <button onClick={decreaseQuantity} disabled={quantity <= 1}>-</button>
            <span>{quantity}</span>
            <button onClick={increaseQuantity}>+</button>
          </div>
          <h3>Gesamtpreis: {totalPrice} €</h3>
          <button onClick={handleAddToCart}>In den Warenkorb</button>
          <button onClick={() => setSelectedItem(null)}>Schließen</button>
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
                {infoItem.zusatztoffe.map((code, index) => (
                  <li key={index}>{zusatztoffeMap[code]}</li>
                ))}
              </ul>
            </div>
          )}
          {infoItem.allergene && infoItem.allergene.length > 0 && (
            <div>
              <p>Allergene:</p>
              <ul>
                {infoItem.allergene.map((code, index) => (
                  <li key={index}>{allergeneMap[code]}</li>
                ))}
              </ul>
            </div>
          )}
          <button onClick={() => setInfoItem(null)}>Schließen</button>
        </Modal>
      )}
    </div>
  );
};

export default Menu;
