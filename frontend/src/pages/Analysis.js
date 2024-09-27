import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {
  Bar as BarChart,
  Doughnut as DoughnutChart
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, // ArcElement'yi ekleyin
  Title,
  Tooltip,
  Legend
} from "chart.js";

// ArcElement'i kaydedin
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,  // ArcElement'i burada kaydedin
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

// Verilerin sıfırlanmasını sağlamak için yardımcı fonksiyon
const fillMissingData = (dataMap, labels) => {
  return labels.map((label) => dataMap.get(label) || 0);
};

const Analysis = () => {
  const [archivedOrders, setArchivedOrders] = useState([]);
  const [dailyOrders, setDailyOrders] = useState(null);
  const [weeklyOrders, setWeeklyOrders] = useState(null);
  const [monthlyOrders, setMonthlyOrders] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    const fetchArchivedOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders/archived");
        setArchivedOrders(response.data);
        processAnalytics(response.data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchArchivedOrders();
  }, []);

  const processAnalytics = (orders) => {
    if (!orders || orders.length === 0) return;

    const dailyOrdersMap = new Map();
    const dailyPriceMap = new Map();
    const weeklyOrdersMap = new Map();
    const weeklyPriceMap = new Map();
    const monthlyOrdersMap = new Map();
    const monthlyPriceMap = new Map();
    const productCounts = new Map();

    // Sabit 7 gün, 4 hafta ve 12 aylık zaman dilimlerini belirleme
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split("T")[0];
    }).reverse();

    const last4Weeks = Array.from({ length: 4 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i * 7);
      return getWeek(date);
    }).reverse();

    const last12Months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return `${date.getFullYear()}-${date.getMonth() + 1}`;
    }).reverse();

    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      const day = date.toISOString().split("T")[0];
      const week = getWeek(date);
      const month = `${date.getFullYear()}-${date.getMonth() + 1}`;

      const totalPrice = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      dailyOrdersMap.set(day, (dailyOrdersMap.get(day) || 0) + 1);
      dailyPriceMap.set(day, (dailyPriceMap.get(day) || 0) + totalPrice);

      weeklyOrdersMap.set(week, (weeklyOrdersMap.get(week) || 0) + 1);
      weeklyPriceMap.set(week, (weeklyPriceMap.get(week) || 0) + totalPrice);

      monthlyOrdersMap.set(month, (monthlyOrdersMap.get(month) || 0) + 1);
      monthlyPriceMap.set(month, (monthlyPriceMap.get(month) || 0) + totalPrice);

      order.items.forEach((item) => {
        productCounts.set(
          item.name,
          (productCounts.get(item.name) || 0) + item.quantity
        );
      });
    });

    // Eksik veriler için sıfırlama
    const dailyOrdersData = fillMissingData(dailyOrdersMap, last7Days);
    const dailyPriceData = fillMissingData(dailyPriceMap, last7Days);
    const weeklyOrdersData = fillMissingData(weeklyOrdersMap, last4Weeks);
    const weeklyPriceData = fillMissingData(weeklyPriceMap, last4Weeks);
    const monthlyOrdersData = fillMissingData(monthlyOrdersMap, last12Months);
    const monthlyPriceData = fillMissingData(monthlyPriceMap, last12Months);

    setDailyOrders({
      labels: last7Days,
      datasets: [
        {
          label: "Tägliche Bestellungen",
          data: dailyOrdersData,
          backgroundColor: "rgba(75,192,192,1)",
        },
        {
          label: "Tägliche Gesamtpreis",
          data: dailyPriceData,
          backgroundColor: "rgba(255,99,132,1)",
        },
      ],
    });

    setWeeklyOrders({
      labels: last4Weeks,
      datasets: [
        {
          label: "Wöchentliche Bestellungen",
          data: weeklyOrdersData,
          backgroundColor: "rgba(255,159,64,1)",
        },
        {
          label: "Wöchentliche Gesamtpreis",
          data: weeklyPriceData,
          backgroundColor: "rgba(153,102,255,1)",
        },
      ],
    });

    setMonthlyOrders({
      labels: last12Months,
      datasets: [
        {
          label: "Monatliche Bestellungen",
          data: monthlyOrdersData,
          backgroundColor: "rgba(54,162,235,1)",
        },
        {
          label: "Monatliche Gesamtpreis",
          data: monthlyPriceData,
          backgroundColor: "rgba(255,205,86,1)",
        },
      ],
    });

    const topProductsData = Array.from(productCounts.entries()).map(
      ([name, count]) => ({ name, count })
    );
    topProductsData.sort((a, b) => b.count - a.count);
    setTopProducts(topProductsData.slice(0, 10));
  };

  const filterAnalytics = () => {
    const filteredOrders = archivedOrders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= startDate && orderDate <= endDate;
    });

    processAnalytics(filteredOrders);
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

      {dailyOrders && (
        <div className="chart-container">
          <h4>Tägliche Bestellungen & Gesamtpreis</h4>
          <BarChart data={dailyOrders} />
        </div>
      )}

      {weeklyOrders && (
        <div className="chart-container">
          <h4>Wöchentliche Bestellungen & Gesamtpreis</h4>
          <BarChart data={weeklyOrders} />
        </div>
      )}

      {monthlyOrders && (
        <div className="chart-container">
          <h4>Monatliche Bestellungen & Gesamtpreis</h4>
          <BarChart data={monthlyOrders} />
        </div>
      )}

      <div className="chart-container">
        <h4>Am häufigsten bestellte Produkte</h4>
        <BarChart
          data={{
            labels: topProducts.map((product) => product.name),
            datasets: [
              {
                label: "Am häufigsten bestellte Produkte",
                data: topProducts.map((product) => product.count),
                backgroundColor: "rgba(153,102,255,0.6)",
              },
            ],
          }}
        />
      </div>

      <div className="chart-container">
        <h4>Top 10 Produkte (Doughnut Chart)</h4>
        <DoughnutChart
          data={{
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
          }}
        />
      </div>
    </div>
  );
};

export default Analysis;
