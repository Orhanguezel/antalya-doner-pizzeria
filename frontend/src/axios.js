import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Bar as BarChart, Doughnut as DoughnutChart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarController,
  DoughnutController,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'; 

// Chart.js bileşenlerini kaydedelim
ChartJS.register(
  BarController,
  DoughnutController,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Haftayı hesaplayan fonksiyon
const getWeek = (date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

const Analysis = () => {
  const [archivedOrders, setArchivedOrders] = useState([]);
  const [dailyOrders, setDailyOrders] = useState([]);
  const [weeklyOrders, setWeeklyOrders] = useState([]);
  const [monthlyOrders, setMonthlyOrders] = useState([]);
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [weeklyRevenue, setWeeklyRevenue] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // Verileri çekmek için useEffect içinde tanımlanan fonksiyon
  useEffect(() => {
    const fetchArchivedOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders/archived`);
        console.log('Fetched Archived Orders:', response.data);
        setArchivedOrders(response.data);
        processAnalytics(response.data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    fetchArchivedOrders();
  }, []); 

  // Analiz verilerini işlemek için fonksiyon
  const processAnalytics = (orders) => {
    const dailyOrdersMap = new Map();
    const weeklyOrdersMap = new Map();
    const monthlyOrdersMap = new Map();
    const dailyRevenueMap = new Map();
    const weeklyRevenueMap = new Map();
    const monthlyRevenueMap = new Map();
    const productCounts = new Map();

    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      const day = date.toISOString().split("T")[0];  // Günleri çekiyoruz
      const week = getWeek(date);
      const month = `${date.getFullYear()}-${date.getMonth() + 1}`;

      // Sipariş adetleri
      dailyOrdersMap.set(day, (dailyOrdersMap.get(day) || 0) + 1);
      weeklyOrdersMap.set(week, (weeklyOrdersMap.get(week) || 0) + 1);
      monthlyOrdersMap.set(month, (monthlyOrdersMap.get(month) || 0) + 1);

      // Toplam sipariş fiyatları
      dailyRevenueMap.set(day, (dailyRevenueMap.get(day) || 0) + order.totalPrice);
      weeklyRevenueMap.set(week, (weeklyRevenueMap.get(week) || 0) + order.totalPrice);
      monthlyRevenueMap.set(month, (monthlyRevenueMap.get(month) || 0) + order.totalPrice);

      order.items.forEach((item) => {
        productCounts.set(
          item.name,
          (productCounts.get(item.name) || 0) + item.quantity
        );
      });
    });

    // Sipariş adetleri ve toplam gelir verilerini düzenleme
    const dailyOrdersData = Array.from(dailyOrdersMap.entries()).map(([date, count]) => ({ date, count }));
    const weeklyOrdersData = Array.from(weeklyOrdersMap.entries()).map(([week, count]) => ({ week, count }));
    const monthlyOrdersData = Array.from(monthlyOrdersMap.entries()).map(([month, count]) => ({ month, count }));
    const dailyRevenueData = Array.from(dailyRevenueMap.entries()).map(([date, revenue]) => ({ date, revenue }));
    const weeklyRevenueData = Array.from(weeklyRevenueMap.entries()).map(([week, revenue]) => ({ week, revenue }));
    const monthlyRevenueData = Array.from(monthlyRevenueMap.entries()).map(([month, revenue]) => ({ month, revenue }));
    const topProductsData = Array.from(productCounts.entries()).map(([name, count]) => ({ name, count }));

    topProductsData.sort((a, b) => b.count - a.count);

    setDailyOrders(dailyOrdersData);
    setWeeklyOrders(weeklyOrdersData);
    setMonthlyOrders(monthlyOrdersData);
    setDailyRevenue(dailyRevenueData);
    setWeeklyRevenue(weeklyRevenueData);
    setMonthlyRevenue(monthlyRevenueData);
    setTopProducts(topProductsData.slice(0, 10));  
  };

  // Tarih aralığına göre siparişleri filtreleme fonksiyonu
  const filterAnalytics = () => {
    const filteredOrders = archivedOrders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= startDate && orderDate <= endDate;
    });

    processAnalytics(filteredOrders);
  };

  // Günlük sipariş ve gelir verileri için çubuk grafik veri seti
  const dailyOrdersChartData = {
    labels: dailyOrders.map((order) => order.date), // X ekseninde günler
    datasets: [
      {
        label: "Tägliche Bestellungen",
        data: dailyOrders.map((order) => order.count), // Y ekseninde sipariş adetleri
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  const dailyRevenueChartData = {
    labels: dailyRevenue.map((order) => order.date), // X ekseninde günler
    datasets: [
      {
        label: "Tägliche Einnahmen (€)",
        data: dailyRevenue.map((order) => order.revenue), // Y ekseninde sipariş gelirleri
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  // Haftalık sipariş ve gelir verileri için çubuk grafik veri seti
  const weeklyOrdersChartData = {
    labels: weeklyOrders.map((order) => `Woche ${order.week}`), // X ekseninde haftalar
    datasets: [
      {
        label: "Wöchentliche Bestellungen",
        data: weeklyOrders.map((order) => order.count), // Y ekseninde sipariş adetleri
        backgroundColor: "rgba(255,159,64,0.6)",
      },
    ],
  };

  const weeklyRevenueChartData = {
    labels: weeklyRevenue.map((order) => `Woche ${order.week}`), // X ekseninde haftalar
    datasets: [
      {
        label: "Wöchentliche Einnahmen (€)",
        data: weeklyRevenue.map((order) => order.revenue), // Y ekseninde sipariş gelirleri
        backgroundColor: "rgba(255,159,64,0.6)",
      },
    ],
  };

  // Aylık sipariş ve gelir verileri için çubuk grafik veri seti
  const monthlyOrdersChartData = {
    labels: monthlyOrders.map((order) => order.month), // X ekseninde aylar
    datasets: [
      {
        label: "Monatliche Bestellungen",
        data: monthlyOrders.map((order) => order.count), // Y ekseninde sipariş adetleri
        backgroundColor: "rgba(153,102,255,0.6)",
      },
    ],
  };

  const monthlyRevenueChartData = {
    labels: monthlyRevenue.map((order) => order.month), // X ekseninde aylar
    datasets: [
      {
        label: "Monatliche Einnahmen (€)",
        data: monthlyRevenue.map((order) => order.revenue), // Y ekseninde sipariş gelirleri
        backgroundColor: "rgba(153,102,255,0.6)",
      },
    ],
  };

  return (
    <div className="analysis">
      <h3>Analyse</h3>
      <div className="date-picker-container">
        <div className="date-picker">
          <label>Startdatum:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="date-picker">
          <label>Enddatum:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <button className="filter-button" onClick={filterAnalytics}>
          Filtern
        </button>
      </div>

      <div className="chart-container">
        <h4>Tägliche Bestellungen</h4>
        <BarChart data={dailyOrdersChartData} />
      </div>

      <div className="chart-container">
        <h4>Tägliche Einnahmen</h4>
        <BarChart data={dailyRevenueChartData} />
      </div>

      <div className="chart-container">
        <h4>Wöchentliche Bestellungen</h4>
        <BarChart data={weeklyOrdersChartData} />
      </div>

      <div className="chart-container">
        <h4>Wöchentliche Einnahmen</h4>
        <BarChart data={weeklyRevenueChartData} />
      </div>

      <div className="chart-container">
        <h4>Monatliche Bestellungen</h4>
        <BarChart data={monthlyOrdersChartData} />
      </div>

      <div className="chart-container">
        <h4>Monatliche Einnahmen</h4>
        <BarChart data={monthlyRevenueChartData} />
      </div>
    </div>
  );
};

export default Analysis;
