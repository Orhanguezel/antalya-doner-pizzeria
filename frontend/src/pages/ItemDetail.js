import React, { useState } from 'react';

const ItemDetail = ({ item, onClose }) => {
  const [selectedPrice, setSelectedPrice] = useState(Object.keys(item.prices)[0]);
  const [selectedExtras, setSelectedExtras] = useState([]);

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
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ItemDetail;
