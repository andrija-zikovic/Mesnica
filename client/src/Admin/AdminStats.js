import React, { useEffect, useState } from "react";
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, BarController } from 'chart.js';

Chart.register(BarElement, BarController, CategoryScale, LinearScale, Title, Tooltip, Legend);

const AdminStats = (token) => {
  const [adminOrd, setAdminOrd] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_ADMIN_GET_ORDERS, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        });
        if (!res.ok) {
          throw new Error("Network response was not ok");
        } else {
          const ordersData = await res.json();
          setAdminOrd(ordersData);
        }
      } catch (error) {
        console.error("Error Fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  console.log(adminOrd);

  useEffect(() => {
    const revenueByDay = adminOrd.reduce((acc, order) => {
      const date = order.date.split(" ")[0];
      console.log(date);
      acc[date] = (acc[date] || 0) + order.total;
      return acc;
    }, {});

    const labels = Object.keys(revenueByDay);
    const data = Object.values(revenueByDay);
    console.log(labels, data);

    const ctx = document.getElementById("revenueByDayChart").getContext("2d");
    const chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Promet po danu",
            data: data,
            backgroundColor: "rgba(228, 50, 50, 0.801)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value, index, values) {
                return value + '€';
              }
            }
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    }
  }, [adminOrd]);

  return (
    <div className="adminStats">
      <h1>Statistika</h1>
      <div className="adminStats__revenueByDay">
        <h2>Promet po danu</h2>
        <canvas id="revenueByDayChart"></canvas>
      </div>
    </div>
  );
};

export default AdminStats;
