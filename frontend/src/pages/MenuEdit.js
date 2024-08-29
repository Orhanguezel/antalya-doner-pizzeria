import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumb';
import './MenuEdit.css';

Modal.setAppElement('#root');

const MenuEdit = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editedItem, setEditedItem] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategory('');
    setItems([]);
  };

  const handleSubcategoryChange = (e) => {
    const subcategory = categories
      .find(cat => cat._id === selectedCategory)
      .subcategories.find(sub => sub._id === e.target.value);
    setSelectedSubcategory(e.target.value);
    setItems(subcategory.items);
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setEditedItem({ ...item, extras: Array.isArray(item.extras) ? item.extras : [] });
    setModalIsOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({
      ...prev,
      prices: {
        ...prev.prices,
        [name]: parseFloat(value),
      },
    }));
  };

  const handleExtraChange = (e, index) => {
    const { name, value } = e.target;
    const newExtras = [...editedItem.extras];
    newExtras[index] = { ...newExtras[index], [name]: value };
    setEditedItem((prev) => ({
      ...prev,
      extras: newExtras,
    }));
  };

  const handleAddExtra = () => {
    setEditedItem((prev) => ({
      ...prev,
      extras: [...(prev.extras || []), { name: '', price: 0 }],
    }));
  };

  const handleRemoveExtra = (index) => {
    const newExtras = [...editedItem.extras];
    newExtras.splice(index, 1);
    setEditedItem((prev) => ({
      ...prev,
      extras: newExtras,
    }));
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(`/api/items/${editedItem._id}`, editedItem);
      setItems((prev) =>
        prev.map((item) => (item._id === response.data._id ? response.data : item))
      );
      setModalIsOpen(false);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      try {
        await axios.delete(`/api/items/${id}`);
        setItems(items.filter((item) => item._id !== id));
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const handleCancelClick = () => {
    setModalIsOpen(false);
    setEditedItem(null);
  };

  return (
    <div className="menu-edit">
      <Breadcrumb />
      <h3>Menü Düzenleme</h3>
      <p>Bu bölümde menüyü düzenleyebilirsiniz.</p>
      <div className="category-select">
        <label>Kategori Seçin:</label>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Kategori Seçin</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {selectedCategory && categories.find(cat => cat._id === selectedCategory) && (
        <div className="subcategory-select">
          <label>Alt Kategori Seçin:</label>
          <select value={selectedSubcategory} onChange={handleSubcategoryChange}>
            <option value="">Alt Kategori Seçin</option>
            {categories
              .find((category) => category._id === selectedCategory)
              .subcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
          </select>
        </div>
      )}
      <div className="items-list">
        {items.map((item) => (
          <div key={item._id} className="item-card">
            <span>{item.nr}. {item.name}</span>
            <button onClick={() => handleEditClick(item)} className="edit-button">Düzenle</button>
            <button onClick={() => handleDeleteClick(item._id)} className="delete-button">Sil</button>
          </div>
        ))}
      </div>
      {selectedItem && editedItem && (
        <Modal isOpen={modalIsOpen} onRequestClose={handleCancelClick} className="modal">
          <h4>{selectedItem.name} Düzenleme</h4>
          <label>
            Adı:
            <input
              type="text"
              name="name"
              value={editedItem.name || ''}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Açıklama:
            <input
              type="text"
              name="description"
              value={editedItem.description || ''}
              onChange={handleInputChange}
            />
          </label>
          {Object.keys(editedItem.prices || {}).map((priceKey) => (
            <label key={priceKey}>
              Fiyat ({priceKey}):
              <input
                type="number"
                name={priceKey}
                value={editedItem.prices[priceKey] || ''}
                onChange={handlePriceChange}
              />
            </label>
          ))}
          <h5>Ekstralar</h5>
          {(editedItem.extras || []).map((extra, index) => (
            <div key={index} className="extra-item">
              <label>
                Ekstra Adı:
                <input
                  type="text"
                  name="name"
                  value={extra.name || ''}
                  onChange={(e) => handleExtraChange(e, index)}
                />
              </label>
              <label>
                Fiyat:
                <input
                  type="number"
                  name="price"
                  value={extra.price || ''}
                  onChange={(e) => handleExtraChange(e, index)}
                />
              </label>
              <button onClick={() => handleRemoveExtra(index)} className="remove-extra-button">Kaldır</button>
            </div>
          ))}
          <button onClick={handleAddExtra} className="add-extra-button">Yeni Ekstra Ekle</button>
          <button onClick={handleSaveClick} className="save-button">Kaydet</button>
          <button onClick={handleCancelClick} className="cancel-button">İptal</button>
        </Modal>
      )}
    </div>
  );
};

export default MenuEdit;
