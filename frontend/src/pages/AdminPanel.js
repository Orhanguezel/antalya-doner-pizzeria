import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './AdminPanel.css';

const AdminPanel = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('Gelen Siparişler');
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [token]);

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/orders/${orderId}/status`, { status }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders(orders.map(order => (order._id === orderId ? { ...order, status: response.data.status } : order)));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const archiveOrder = async (orderId) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/orders/${orderId}/archive`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders(orders.map(order => order._id === orderId ? response.data : order));
    } catch (error) {
      console.error('Error archiving order:', error);
    }
  };

  const printOrder = (orderId) => {
    const orderElement = document.getElementById(`order-${orderId}`);
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Bestellung</title>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(orderElement.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  const filterOrders = (status) => {
    setFilter(status);
  };

  const filteredOrders = orders
    .filter(order => {
      if (filter === 'Gelen Siparişler') return order.status === 'Gelen Siparişler';
      if (filter === 'Hazırlanan Siparişler') return order.status === 'Hazırlanan Siparişler';
      if (filter === 'Taşınan Siparişler') return order.status === 'Taşınan Siparişler';
      if (filter === 'Teslim Edilen Siparişler') return order.status === 'Teslim Edilen Siparişler';
      return false;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const orderTypeMap = {
    delivery: 'Lieferung',
    pickup: 'Abholung',
    dinein: 'Im Restaurant essen'
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <div className="order-status-buttons">
        <button onClick={() => filterOrders('Gelen Siparişler')} className={filter === 'Gelen Siparişler' ? 'active' : ''}>Eingegangene</button>
        <button onClick={() => filterOrders('Hazırlanan Siparişler')} className={filter === 'Hazırlanan Siparişler' ? 'active' : ''}>Vorbereitete</button>
        <button onClick={() => filterOrders('Taşınan Siparişler')} className={filter === 'Taşınan Siparişler' ? 'active' : ''}>Liefernde</button>
        <button onClick={() => filterOrders('Teslim Edilen Siparişler')} className={filter === 'Teslim Edilen Siparişler' ? 'active' : ''}>Gelieferte</button>
      </div>
      <ul className="order-list">
        {filteredOrders.map(order => (
          <li key={order._id} id={`order-${order._id}`} className="order-card">
            <p><strong>Bestell-ID:</strong> {order._id}</p>
            <p><strong>Bestellzeit:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Kunde:</strong> {order.customerInfo.name} {order.customerInfo.surname}</p>
            <p><strong>Email:</strong> {order.customerInfo.email}</p>
            <p><strong>Telefon:</strong> {order.customerInfo.phone}</p>
            <p><strong>Adresse:</strong> {order.customerInfo.address}</p>
            <p><strong>Region:</strong> {order.customerInfo.region}</p>
            <p><strong>Zahlungsmethode:</strong> {order.customerInfo.paymentMethod}</p>
            <p><strong>Bestellart:</strong> {orderTypeMap[order.orderType]}</p>
            <p><strong>Besondere Wünsche:</strong> {order.customerInfo.specialRequest}</p>
            <h4>Produkte:</h4>
            <ul className="order-items">
              {order.items.map(item => (
                <li key={item._id}>
                  <h4>{item.quantity} x {item.nr ? `${item.nr}. ` : ''}{item.name} {item.selectedPrice.key === 'default' ? `${item.selectedPrice.value} €` : `${item.selectedPrice.key} - ${item.selectedPrice.value} €`}</h4>
                  {item.extras && item.extras.length > 0 && (
                    <>
                      <p>Extras:</p>
                      <ul>
                        {item.extras.map((extra, index) => (
                          <li key={index}>{extra.name} (+{extra.price} €)</li>
                        ))}
                      </ul>
                    </>
                  )}
                  <p>Gesamtpreis: {item.totalPrice} €</p>
                </li>
              ))}
            </ul>
            {order.orderType === 'delivery' && <p>Lieferungskosten: {order.deliveryFee}€</p>}
            <p><strong>Gesamt:</strong> {order.total + (order.orderType === 'delivery' ? order.deliveryFee : 0)}€</p>
            <p><strong>Status:</strong> {order.status}</p>
            <div className="order-actions">
              {filter === 'Gelen Siparişler' && <button onClick={() => updateOrderStatus(order._id, 'Hazırlanan Siparişler')}>Vorbereiten</button>}
              {filter === 'Hazırlanan Siparişler' && <button onClick={() => updateOrderStatus(order._id, 'Taşınan Siparişler')}>Liefern</button>}
              {filter === 'Taşınan Siparişler' && <button onClick={() => updateOrderStatus(order._id, 'Teslim Edilen Siparişler')}>Geliefert</button>}
              {filter !== 'Teslim Edilen Siparişler' && <button onClick={() => printOrder(order._id)}>Drucken</button>}
              {filter === 'Teslim Edilen Siparişler' && (
                <>
                  <button onClick={() => archiveOrder(order._id)}>Archivieren</button>
                  <button onClick={() => printOrder(order._id)}>Drucken</button>
                </>
              )}
              {filter !== 'Teslim Edilen Siparişler' && <button onClick={() => setConfirmDelete(order._id)}>Löschen</button>}
            </div>
            {confirmDelete === order._id && (
              <div className="confirm-delete">
                <p>Gerçekten bu siparişi silmek istiyor musunuz?</p>
                <button onClick={() => deleteOrder(order._id)}>Evet</button>
                <button onClick={() => setConfirmDelete(null)}>Hayır</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
