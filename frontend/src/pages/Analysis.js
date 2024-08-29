import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import { Line as LineChart, Bar as BarChart } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Breadcrumb from '../components/Breadcrumb';
import './Analysis.css';

// Chart.js'nin gerekli bileşenlerini manuel olarak kaydedelim
Chart.register(...registerables);

const Analysis = () => {
  const [archivedOrders, setArchivedOrders] = useState([]);
  const [dailyOrders, setDailyOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('/api/orders/archived');
        setArchivedOrders(response.data);
        processAnalytics(response.data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    fetchAnalytics();
  }, []);

  const processAnalytics = (orders) => {
    const dailyOrdersMap = new Map();
    const productCounts = new Map();

    orders.forEach(order => {
      const date = new Date(order.createdAt).toISOString().split('T')[0];
      dailyOrdersMap.set(date, (dailyOrdersMap.get(date) || 0) + 1);

      order.items.forEach(item => {
        productCounts.set(item.name, (productCounts.get(item.name) || 0) + item.quantity);
      });
    });

    const dailyOrdersData = Array.from(dailyOrdersMap.entries()).map(([date, count]) => ({ date, count }));
    const topProductsData = Array.from(productCounts.entries()).map(([name, count]) => ({ name, count }));

    setDailyOrders(dailyOrdersData);
    setTopProducts(topProductsData);
  };

  const filterAnalytics = () => {
    const filteredOrders = archivedOrders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= startDate && orderDate <= endDate;
    });

    processAnalytics(filteredOrders);
  };

  const dailyOrdersChartData = {
    labels: dailyOrders.map(order => order.date),
    datasets: [
      {
        label: 'Günlük Siparişler',
        data: dailyOrders.map(order => order.count),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  const topProductsChartData = {
    labels: topProducts.map(product => product.name),
    datasets: [
      {
        label: 'En Çok Sipariş Edilen Ürünler',
        data: topProducts.map(product => product.count),
        backgroundColor: 'rgba(153,102,255,0.6)',
      },
    ],
  };

  return (
    <div className="analysis">
      <Breadcrumb />
      <h3>Analiz</h3>
      <div className="date-picker-container">
        <div className="date-picker">
          <label>Başlangıç Tarihi:</label>
          <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
        </div>
        <div className="date-picker">
          <label>Bitiş Tarihi:</label>
          <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
        </div>
        <button className="filter-button" onClick={filterAnalytics}>Filtrele</button>
      </div>
      <div className="chart-container">
        <h4>Günlük Siparişler</h4>
        <LineChart data={dailyOrdersChartData} />
      </div>
      <div className="chart-container">
        <h4>En Çok Sipariş Edilen Ürünler</h4>
        <BarChart data={topProductsChartData} />
      </div>
    </div>
  );
};

export default Analysis;
