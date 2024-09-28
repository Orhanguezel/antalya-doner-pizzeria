import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar as BarChart, Doughnut as DoughnutChart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Analysis.css";

// Chart.js bileşenlerini kaydediyoruz
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
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

// Tarih formatı ayarlayan fonksiyon
const formatRangeDisplay = (start, end, rangeType) => {
  const options = { year: "numeric", month: "short" };
  if (rangeType === "7 Tage") {
    return `${start.toLocaleDateString("de-DE")} - ${end.toLocaleDateString("de-DE")}`;
  }
  return `${start.toLocaleDateString("de-DE", options)} - ${end.toLocaleDateString("de-DE", options)}`;
};

const Analysis = () => {
  const [archivedOrders, setArchivedOrders] = useState([]);
  const [dailyOrders, setDailyOrders] = useState(null); // Bestellmengen
  const [dailyRevenue, setDailyRevenue] = useState(null); // Einnahmen
  const [topProducts, setTopProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("7 Tage");

  // API URL
  const apiUrl = process.env.REACT_APP_API_BASE_URL || "https://www.antalya-doner-pizzeria.de/api";

  useEffect(() => {
    const fetchArchivedOrders = async () => {
      try {
        const response = await axios.get(`${apiUrl}/orders/archived`);
        setArchivedOrders(response.data);
        processAnalytics(response.data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Analysedaten:", error);
      }
    };

    fetchArchivedOrders();
  }, []);

  // Bestelldaten verarbeiten
  const processAnalytics = (orders) => {
    const dailyOrdersMap = new Map();
    const dailyRevenueMap = new Map(); // Einnahmen-Mapping
    const weeklyOrdersMap = new Map();
    const monthlyOrdersMap = new Map();
    const yearlyOrdersMap = new Map();
    const weeklyRevenueMap = new Map(); // Wöchentliche Einnahmen
    const monthlyRevenueMap = new Map(); // Monatliche Einnahmen
    const yearlyRevenueMap = new Map(); // Jährliche Einnahmen
    const productCounts = new Map();

    // Festgelegte Zeiträume: 7 Tage, 4 Wochen, 6 Monate und 12 Monate
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

    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return `${date.getFullYear()}-${date.getMonth() + 1}`;
    }).reverse();

    const last12Months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return `${date.getFullYear()}-${date.getMonth() + 1}`; // Letzte 12 Monate korrekt berechnen
    }).reverse();

    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      const day = date.toISOString().split("T")[0];
      const week = getWeek(date);
      const month = `${date.getFullYear()}-${date.getMonth() + 1}`;

      // Bestellmengen zählen
      dailyOrdersMap.set(day, (dailyOrdersMap.get(day) || 0) + 1);

      // Einnahmen berechnen
      const totalRevenue = order.items.reduce((sum, item) => {
        return sum + item.selectedPrice.value * item.quantity; // Preis korrekt berechnen
      }, 0);

      // Tägliche Einnahmen
      dailyRevenueMap.set(day, (dailyRevenueMap.get(day) || 0) + totalRevenue);

      // Wöchentliche Einnahmen
      weeklyRevenueMap.set(week, (weeklyRevenueMap.get(week) || 0) + totalRevenue);
      weeklyOrdersMap.set(week, (weeklyOrdersMap.get(week) || 0) + 1);

      // Monatliche Einnahmen
      monthlyRevenueMap.set(month, (monthlyRevenueMap.get(month) || 0) + totalRevenue);
      monthlyOrdersMap.set(month, (monthlyOrdersMap.get(month) || 0) + 1);

      // Jährliche Einnahmen
      yearlyRevenueMap.set(month, (yearlyRevenueMap.get(month) || 0) + totalRevenue);
      yearlyOrdersMap.set(month, (yearlyOrdersMap.get(month) || 0) + 1);

      order.items.forEach((item) => {
        productCounts.set(
          item.name,
          (productCounts.get(item.name) || 0) + item.quantity
        );
      });
    });

    // Bestellmengen-Daten für den gewählten Zeitraum
    const dailyOrdersData = fillMissingData(dailyOrdersMap, last7Days);
    const weeklyOrdersData = fillMissingData(weeklyOrdersMap, last4Weeks);
    const monthlyOrdersData = fillMissingData(monthlyOrdersMap, last6Months);
    const yearlyOrdersData = fillMissingData(yearlyOrdersMap, last12Months);

    setDailyOrders({
      labels:
        activeFilter === "7 Tage"
          ? last7Days
          : activeFilter === "4 Wochen"
          ? last4Weeks
          : activeFilter === "6 Monate"
          ? last6Months
          : last12Months,
      datasets: [
        {
          label: "Bestellmenge",
          data:
            activeFilter === "7 Tage"
              ? dailyOrdersData
              : activeFilter === "4 Wochen"
              ? weeklyOrdersData
              : activeFilter === "6 Monate"
              ? monthlyOrdersData
              : yearlyOrdersData,
          backgroundColor: "rgba(75,192,192,1)",
        },
      ],
    });

    // Einnahmen-Daten für den gewählten Zeitraum
    const dailyRevenueData = fillMissingData(dailyRevenueMap, last7Days);
    const weeklyRevenueData = fillMissingData(weeklyRevenueMap, last4Weeks);
    const monthlyRevenueData = fillMissingData(monthlyRevenueMap, last6Months);
    const yearlyRevenueData = fillMissingData(yearlyRevenueMap, last12Months);

    // Einnahmen-Diagramm
    setDailyRevenue({
      labels:
        activeFilter === "7 Tage"
          ? last7Days
          : activeFilter === "4 Wochen"
          ? last4Weeks
          : activeFilter === "6 Monate"
          ? last6Months
          : last12Months,
      datasets: [
        {
          label: "Gesamtumsatz (€)",
          data:
            activeFilter === "7 Tage"
              ? dailyRevenueData
              : activeFilter === "4 Wochen"
              ? weeklyRevenueData
              : activeFilter === "6 Monate"
              ? monthlyRevenueData
              : yearlyRevenueData,
          backgroundColor: "rgba(255,99,132,1)",
        },
      ],
    });

    const topProductsData = Array.from(productCounts.entries()).map(
      ([name, count]) => ({ name, count })
    );
    topProductsData.sort((a, b) => b.count - a.count);
    setTopProducts(topProductsData.slice(0, 10));
  };

  const filterAnalytics = (filter) => {
    setActiveFilter(filter);
    processAnalytics(archivedOrders); // Filter anwenden und Analytics neu berechnen
  };

  return (
    <div className="analysis">
      <h3>Analyse</h3>

      <div className="filter-buttons">
        <button onClick={() => filterAnalytics("7 Tage")}>7 Tage</button>
        <button onClick={() => filterAnalytics("4 Wochen")}>4 Wochen</button>
        <button onClick={() => filterAnalytics("6 Monate")}>6 Monate</button>
        <button onClick={() => filterAnalytics("1 Jahr")}>1 Jahr</button>
      </div>

      {dailyOrders && (
        <div className="chart-container">
          <h4>Tägliche Bestellmenge</h4>
          <BarChart data={dailyOrders} />
        </div>
      )}

      {dailyRevenue && (
        <div className="chart-container">
          <h4>Täglicher Umsatz</h4>
          <BarChart data={dailyRevenue} />
        </div>
      )}

      <div className="chart-container">
        <h4>Top 10 Produkte</h4>
        <BarChart
          data={{
            labels: topProducts.map((product) => product.name),
            datasets: [
              {
                label: "Bestellmenge",
                data: topProducts.map((product) => product.count),
                backgroundColor: "rgba(153,102,255,0.6)",
              },
            ],
          }}
        />
      </div>

      <div className="chart-container">
        <h4>Top 10 Produkte (Donut-Diagramm)</h4>
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
