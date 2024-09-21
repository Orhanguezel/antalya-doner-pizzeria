import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart, registerables } from "chart.js";
import { Line as LineChart, Bar as BarChart, Doughnut as DoughnutChart } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Analysis.css";

Chart.register(...registerables);

const Analysis = () => {
  const [archivedOrders, setArchivedOrders] = useState([]);
  const [dailyOrders, setDailyOrders] = useState([]);
  const [weeklyOrders, setWeeklyOrders] = useState([]);
  const [monthlyOrders, setMonthlyOrders] = useState([]);
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
  }, []); // Bu kısımda sadece bileşen yüklendiğinde çalışacak.

  // Analiz verilerini işlemek için fonksiyon
  const processAnalytics = (orders) => {
    const dailyOrdersMap = new Map();
    const weeklyOrdersMap = new Map();
    const monthlyOrdersMap = new Map();
    const productCounts = new Map();

    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      const day = date.toISOString().split("T")[0];
      const week = getWeek(date);
      const month = `${date.getFullYear()}-${date.getMonth() + 1}`;

      dailyOrdersMap.set(day, (dailyOrdersMap.get(day) || 0) + 1);
      weeklyOrdersMap.set(week, (weeklyOrdersMap.get(week) || 0) + 1);
      monthlyOrdersMap.set(month, (monthlyOrdersMap.get(month) || 0) + 1);

      order.items.forEach((item) => {
        productCounts.set(
          item.name,
          (productCounts.get(item.name) || 0) + item.quantity
        );
      });
    });

    const dailyOrdersData = Array.from(dailyOrdersMap.entries()).map(([date, count]) => ({ date, count }));
    const weeklyOrdersData = Array.from(weeklyOrdersMap.entries()).map(([week, count]) => ({ week, count }));
    const monthlyOrdersData = Array.from(monthlyOrdersMap.entries()).map(([month, count]) => ({ month, count }));
    const topProductsData = Array.from(productCounts.entries()).map(([name, count]) => ({ name, count }));

    topProductsData.sort((a, b) => b.count - a.count);

    setDailyOrders(dailyOrdersData);
    setWeeklyOrders(weeklyOrdersData);
    setMonthlyOrders(monthlyOrdersData);
    setTopProducts(topProductsData.slice(0, 10));  // En çok sipariş edilen ilk 10 ürünü al
  };

  // Haftayı hesaplayan fonksiyon
  const getWeek = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  // Tarih aralığına göre siparişleri filtreleme fonksiyonu
  const filterAnalytics = () => {
    const filteredOrders = archivedOrders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= startDate && orderDate <= endDate;
    });

    processAnalytics(filteredOrders);
  };

  // Günlük sipariş verileri için grafiğin veri seti
  const dailyOrdersChartData = {
    labels: dailyOrders.map((order) => order.date),
    datasets: [
      {
        label: "Tägliche Bestellungen",
        data: dailyOrders.map((order) => order.count),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.4)",
        fill: false,
      },
    ],
  };

  // Haftalık sipariş verileri için grafiğin veri seti
  const weeklyOrdersChartData = {
    labels: weeklyOrders.map((order) => `Woche ${order.week}`),
    datasets: [
      {
        label: "Wöchentliche Bestellungen",
        data: weeklyOrders.map((order) => order.count),
        borderColor: "rgba(255,159,64,1)",
        backgroundColor: "rgba(255,159,64,0.4)",
        fill: false,
      },
    ],
  };

  // Aylık sipariş verileri için grafiğin veri seti
  const monthlyOrdersChartData = {
    labels: monthlyOrders.map((order) => order.month),
    datasets: [
      {
        label: "Monatliche Bestellungen",
        data: monthlyOrders.map((order) => order.count),
        borderColor: "rgba(153,102,255,1)",
        backgroundColor: "rgba(153,102,255,0.4)",
        fill: false,
      },
    ],
  };

  // Ürün bazında en çok sipariş edilen ürünler için veri seti
  const topProductsChartData = {
    labels: topProducts.map((product) => product.name),
    datasets: [
      {
        label: "Am häufigsten bestellte Produkte",
        data: topProducts.map((product) => product.count),
        backgroundColor: "rgba(153,102,255,0.6)",
      },
    ],
  };

  // Doughnut Chart veri seti
  const topProductsDoughnutData = {
    labels: topProducts.map((product) => product.name),
    datasets: [
      {
        data: topProducts.map((product) => product.count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
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
        <LineChart data={dailyOrdersChartData} />
      </div>

      <div className="chart-container">
        <h4>Wöchentliche Bestellungen</h4>
        <LineChart data={weeklyOrdersChartData} />
      </div>

      <div className="chart-container">
        <h4>Monatliche Bestellungen</h4>
        <LineChart data={monthlyOrdersChartData} />
      </div>

      <div className="chart-container">
        <h4>Am häufigsten bestellte Produkte</h4>
        <BarChart data={topProductsChartData} />
      </div>

      <div className="chart-container">
        <h4>Top 10 Produkte (Doughnut Chart)</h4>
        <DoughnutChart data={topProductsDoughnutData} />
      </div>
    </div>
  );
};

export default Analysis;
