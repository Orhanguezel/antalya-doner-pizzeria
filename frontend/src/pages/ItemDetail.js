import React, { useState, useEffect } from 'react';
import api from "../axios"; // Kimlik doğrulaması gerekmeyen API çağrıları için axios instance
import authInstance from "../authAxios"; // Kimlik doğrulaması gerektiren API çağrıları için authAxios
import './ItemDetail.css'; // Stil dosyasını import ediyoruz

const ItemDetail = ({ itemId, onAddToCart, onClose }) => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedExtras, setSelectedExtras] = useState([]);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`/api/items/${itemId}`);
        setItem(response.data);
        setSelectedPrice(Object.keys(response.data.prices)[0]);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching item');
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [itemId]);

  const handlePriceChange = (e) => {
    setSelectedPrice(e.target.value);
  };

  const handleExtraChange = (e) => {
    const value = e.target.value;
    if (selectedExtras.includes(value)) {
      setSelectedExtras(selectedExtras.filter((extra) => extra !== value));
    } else {
      setSelectedExtras([...selectedExtras, value]);
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = item.prices[selectedPrice];
    selectedExtras.forEach((extra) => {
      totalPrice += item.extras[extra];
    });
    return totalPrice;
  };

  const handleAddToCart = () => {
    const newItem = {
      ...item,
      selectedPrice: item.prices[selectedPrice],
      selectedExtras,
      totalPrice: calculateTotalPrice(),
    };
    onAddToCart(newItem);
    onClose();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="item-detail">
      <h3>{item.nr}. {item.name}</h3>
      <p>{item.description}</p>
      <div>
        <h4>Prices:</h4>
        {Object.keys(item.prices).map((priceKey) => (
          <div key={priceKey}>
            <input
              type="radio"
              id={priceKey}
              name="price"
              value={priceKey}
              checked={selectedPrice === priceKey}
              onChange={handlePriceChange}
            />
            <label htmlFor={priceKey}>{priceKey}: {item.prices[priceKey]} €</label>
          </div>
        ))}
      </div>
      <div>
        <h4>Extras:</h4>
        {Object.keys(item.extras).map((extraKey) => (
          <div key={extraKey}>
            <input
              type="checkbox"
              id={extraKey}
              name="extra"
              value={extraKey}
              checked={selectedExtras.includes(extraKey)}
              onChange={handleExtraChange}
            />
            <label htmlFor={extraKey}>{extraKey}: {item.extras[extraKey]} €</label>
          </div>
        ))}
      </div>
      <p>Total Price: {calculateTotalPrice()} €</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ItemDetail;
