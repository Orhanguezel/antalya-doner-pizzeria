import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState([]);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/items/${id}`);
        setItem(response.data);
        setSelectedPrice(Object.keys(response.data.prices)[0]);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching item');
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!item) return <div>No item found</div>; // Veri null olduğunda

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
      <button onClick={() => window.history.back()}>Close</button>
    </div>
  );
};

export default ItemDetail;
