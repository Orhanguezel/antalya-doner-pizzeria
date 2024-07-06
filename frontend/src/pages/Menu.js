import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './Menu.css';

// Modal-Komponente auf das Root-Element einstellen
Modal.setAppElement('#root');

const Menu = () => {
  // useState-Hooks zum Definieren der Zustände
  const [categories, setCategories] = useState([]); // Zustand für Kategorien
  const [activeCategory, setActiveCategory] = useState(''); // Zustand für die aktive Kategorie
  const [selectedItem, setSelectedItem] = useState(null); // Zustand für das ausgewählte Element
  const [selectedPrice, setSelectedPrice] = useState(null); // Zustand für den ausgewählten Preis
  const [extras, setExtras] = useState([]); // Zustand für Extras
  const [totalPrice, setTotalPrice] = useState(0); // Zustand für den Gesamtpreis

  // useEffect-Hook zum Abrufen der Kategorien
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories'); // Kategorien von der API abrufen
        if (!response.ok) {
          throw new Error('Netzwerkantwort war nicht ok');
        }
        const data = await response.json(); // In JSON-Daten umwandeln
        setCategories(data); // Kategorienzustand aktualisieren
        if (data.length > 0) {
          setActiveCategory(data[0]._id); // Erste Kategorie als Standard auswählen
        }
      } catch (error) {
        console.error('Fehler beim Abrufen der Kategorien:', error); // Fehler im Konsolenprotokoll anzeigen
      }
    };

    fetchCategories(); // Funktion aufrufen
  }, []);

  // Funktion, die beim Auswählen eines Artikels ausgeführt wird
  const handleSelectItem = (item) => {
    setSelectedItem(item); // Ausgewählten Artikel in den Zustand setzen
    const defaultPriceKey = Object.keys(item.prices)[0]; // Standard-Preisschlüssel abrufen
    setSelectedPrice({ key: defaultPriceKey, value: item.prices[defaultPriceKey] }); // Ausgewählten Preis aktualisieren
    setExtras([]); // Extras zurücksetzen
    setTotalPrice(item.prices[defaultPriceKey]); // Gesamtpreis mit dem Standardpreis starten
  };

  // Funktion, die beim Ändern eines Extras ausgeführt wird
  const handleExtraChange = (extraName, extraPrice, isChecked) => {
    const newExtras = [...extras];
    if (isChecked) {
      newExtras.push({ name: extraName, price: extraPrice }); // Extra hinzufügen
    } else {
      const index = newExtras.findIndex((extra) => extra.name === extraName);
      newExtras.splice(index, 1); // Extra entfernen
    }
    setExtras(newExtras); // Extras aktualisieren

    const newTotalPrice = newExtras.reduce((acc, curr) => acc + curr.price, selectedPrice.value); // Neuen Gesamtpreis berechnen
    setTotalPrice(newTotalPrice); // Gesamtpreis aktualisieren
  };

  // Funktion, die beim Ändern des Preises ausgeführt wird
  const handlePriceChange = (priceKey, priceValue) => {
    setSelectedPrice({ key: priceKey, value: priceValue }); // Ausgewählten Preis aktualisieren
    const newTotalPrice = extras.reduce((acc, curr) => acc + curr.price, priceValue); // Neuen Gesamtpreis berechnen
    setTotalPrice(newTotalPrice); // Gesamtpreis aktualisieren
  };

  // Funktion, die beim Hinzufügen eines Artikels zum Warenkorb ausgeführt wird
  const handleAddToCart = () => {
    // Hier wird der Artikel dem Warenkorb hinzugefügt
    console.log('Zum Warenkorb hinzugefügt:', { ...selectedItem, selectedPrice, extras, totalPrice });
    setSelectedItem(null); // Popup schließen
  };

  return (
    <div>
      <h1>Unser Menu</h1>
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
                        <img key={index} src={image} alt={`Unterkategorie ${index}`} style={{ width: '50%' }} />
                      ))}
                    </div>
                  )}
                  <div className="items-container">
                    {subcategory.items.map((item) => (
                      <div className="card" key={item._id}>
                        <h4>{item.nr}. {item.name}</h4>
                        {category.name === 'sparmenu' && item.image && (
                          <img src={item.image} alt={item.name} style={{ width: '100%' }} />
                        )}
                        <p>{item.description}</p>
                        <p>Preis: {Math.min(...Object.values(item.prices))} €</p> {/* Minimum Preis anzeigen */}
                        <button onClick={() => handleSelectItem(item)}>+</button> {/* Artikel auswählen */}
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
              <p>Fiyat Seçenekleri:</p>
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
                  <label htmlFor={`extra-${extraName}`}>{extraName} (+{extraPrice} €)</label>
                </div>
              ))}
            </div>
          )}
          <h3>Gesamtpreis: {totalPrice} €</h3>
          <button onClick={handleAddToCart}>Zum Warenkorb hinzufügen</button>
          <button onClick={() => setSelectedItem(null)}>Schließen</button>
        </Modal>
      )}
    </div>
  );
};

export default Menu;
