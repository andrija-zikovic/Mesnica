import React, { useEffect, useState, useRef } from "react";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineElement,
  LineController,
  PieController,
  ArcElement,
  PointElement,
} from "chart.js";

Chart.register(
  BarElement,
  BarController,
  LineElement,
  LineController,
  PieController,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const AdminStats = (token) => {
  const [adminOrd, setAdminOrd] = useState([]);
  const dayChartRef = useRef(null);
  const monthChartRef = useRef(null);
  const yearChartRef = useRef(null);
  const productsChartRef = useRef(null);
  const [chartType, setChartType] = useState("bar");
  const [statsRevenu, setStatsRevenu] = useState("day");
  const [productsChartType, setProductsChartType] = useState("bar");
  const [productsStats, setProductsStats] = useState([]);
  const [productsSort, setProductsSort] = useState("quantityUp");

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

  useEffect(() => {
    const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
    if (statsRevenu === "day") {
      const revenueByDay = adminOrd.reduce((acc, order) => {
        const date = order.date.split(" ")[0];
        acc[date] = (acc[date] || 0) + order.total;
        return acc;
      }, {});

      const labels = Object.keys(revenueByDay);
      const data = Object.values(revenueByDay);

      const ctx = dayChartRef.current.getContext("2d");
      const chartInstance = new Chart(ctx, {
        type: chartType,
        data: {
          labels: labels,
          datasets: [
            {
              label: "Promet po danu",
              data: data,
              backgroundColor: colors,
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              barPercentage: 1,
              categoryPercentage: 0.5,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value, index, values) {
                  return value + "€";
                },
              },
            },
          },
        },
        plugins: [
          {
            afterDraw: (chart, easing) => {
              const ctx = chart.ctx;
              ctx.font = "bold 12px Arial";
              ctx.textAlign = "center";
              ctx.textBaseline = "bottom";

              if (chartType === "pie") {
                chart.data.datasets.forEach((dataset, index) => {
                  const meta = chart.getDatasetMeta(index);
                  meta.data.forEach((sector, index) => {
                    const data = dataset.data[index].toFixed(2) + "€";
                    const midRadius =
                      (sector.innerRadius + sector.outerRadius) / 2;
                    const startAngle = sector.startAngle;
                    const endAngle = sector.endAngle;
                    const midAngle = startAngle + (endAngle - startAngle) / 2;
                    const x = midRadius * Math.cos(midAngle);
                    const y = midRadius * Math.sin(midAngle);
                    ctx.fillStyle = "black"; // or any color you want for the text
                    ctx.fillText(data, sector.x + x, sector.y + y);
                  });
                });
              } else {
                chart.data.datasets.forEach((dataset, index) => {
                  const meta = chart.getDatasetMeta(index);
                  meta.data.forEach((bar, index) => {
                    const data = dataset.data[index].toFixed(2) + "€";
                    ctx.fillText(data, bar.x, bar.y - 5);
                  });
                });
              }
            },
          },
        ],
      });

      return () => {
        chartInstance.destroy();
      };
    } else if (statsRevenu === "mjesec") {
      const monthNames = [
        "siječanj",
        "veljača",
        "ožujak",
        "travanj",
        "svibanj",
        "lipanj",
        "srpanj",
        "kolovoz",
        "rujan",
        "listopad",
        "studeni",
        "prosinac",
      ];

      const revenueByMonth = adminOrd.reduce((acc, order) => {
        const date = order.date.split(" ")[0].split("-")[1];
        const monthName = monthNames[parseInt(date) - 1];

        acc[monthName] = (acc[monthName] || 0) + order.total;
        return acc;
      }, {});

      const labels = Object.keys(revenueByMonth);
      const data = Object.values(revenueByMonth);

      const ctx = monthChartRef.current.getContext("2d");
      const chartInstance = new Chart(ctx, {
        type: chartType,
        data: {
          labels: labels,
          datasets: [
            {
              label: "Promet po mjesecu",
              data: data,
              backgroundColor: colors,
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              barPercentage: 0.5,
              categoryPercentage: 0.5,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value, index, values) {
                  return value + "€";
                },
              },
            },
          },
        },
        plugins: [
          {
            afterDraw: (chart, easing) => {
              const ctx = chart.ctx;
              ctx.font = "bold 12px Arial";
              ctx.textAlign = "center";
              ctx.textBaseline = "bottom";

              if (chartType === "pie") {
                chart.data.datasets.forEach((dataset, index) => {
                  const meta = chart.getDatasetMeta(index);
                  meta.data.forEach((sector, index) => {
                    const data = dataset.data[index].toFixed(2) + "€";
                    const midRadius =
                      (sector.innerRadius + sector.outerRadius) / 2;
                    const startAngle = sector.startAngle;
                    const endAngle = sector.endAngle;
                    const midAngle = startAngle + (endAngle - startAngle) / 2;
                    const x = midRadius * Math.cos(midAngle);
                    const y = midRadius * Math.sin(midAngle);
                    ctx.fillStyle = "black"; // or any color you want for the text
                    ctx.fillText(data, sector.x + x, sector.y + y);
                  });
                });
              } else {
                chart.data.datasets.forEach((dataset, index) => {
                  const meta = chart.getDatasetMeta(index);
                  meta.data.forEach((bar, index) => {
                    const data = dataset.data[index].toFixed(2) + "€";
                    ctx.fillText(data, bar.x, bar.y - 5);
                  });
                });
              }
            },
          },
        ],
      });

      return () => {
        chartInstance.destroy();
      };
    } else if (statsRevenu === "godina") {
      const revenueByYear = adminOrd.reduce((acc, order) => {
        const date = order.date.split(" ")[0].split("-")[0];
        acc[date] = (acc[date] || 0) + order.total;
        return acc;
      }, {});

      const labels = Object.keys(revenueByYear);
      const data = Object.values(revenueByYear);

      const ctx = yearChartRef.current.getContext("2d");
      const chartInstance = new Chart(ctx, {
        type: chartType,
        data: {
          labels: labels,
          datasets: [
            {
              label: "Promet po godini",
              data: data,
              backgroundColor: colors,
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              barPercentage: 0.5,
              categoryPercentage: 0.5,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value, index, values) {
                  return value + "€";
                },
              },
            },
          },
        },
        plugins: [
          {
            afterDraw: (chart, easing) => {
              const ctx = chart.ctx;
              ctx.font = "bold 12px Arial";
              ctx.textAlign = "center";
              ctx.textBaseline = "bottom";

              if (chartType === "pie") {
                chart.data.datasets.forEach((dataset, index) => {
                  const meta = chart.getDatasetMeta(index);
                  meta.data.forEach((sector, index) => {
                    const data = dataset.data[index].toFixed(2) + "€";
                    const midRadius =
                      (sector.innerRadius + sector.outerRadius) / 2;
                    const startAngle = sector.startAngle;
                    const endAngle = sector.endAngle;
                    const midAngle = startAngle + (endAngle - startAngle) / 2;
                    const x = midRadius * Math.cos(midAngle);
                    const y = midRadius * Math.sin(midAngle);
                    ctx.fillStyle = "black"; // or any color you want for the text
                    ctx.fillText(data, sector.x + x, sector.y + y);
                  });
                });
              } else {
                chart.data.datasets.forEach((dataset, index) => {
                  const meta = chart.getDatasetMeta(index);
                  meta.data.forEach((bar, index) => {
                    const data = dataset.data[index].toFixed(2) + "€";
                    ctx.fillText(data, bar.x, bar.y - 5);
                  });
                });
              }
            },
          },
        ],
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, [adminOrd, statsRevenu, chartType]);

  useEffect(() => {
    const products = adminOrd.reduce((acc, order) => {
      order.products.forEach((product) => {
        const { description, quantity, price } = product;
        if (acc[description]) {
          acc[description].quantity += quantity;
          acc[description].totalPrice += price * quantity;
        } else {
          acc[description] = {
            title: description,
            quantity: quantity,
            totalPrice: price * quantity,
          };
        }
      });
      return acc;
    }, {});
    console.log("Products:", products);
    const sortedProducts = Object.entries(products).sort(
      (a, b) => b[1].quantity - a[1].quantity
    );
    setProductsStats(sortedProducts);
    console.log("Sorted Products:", sortedProducts);
  }, [adminOrd]);

  return (
    <div className="adminStats">
      <h1>Statistika</h1>
      {statsRevenu === "day" ? (
        <div className="adminStats__revenueByDay">
          <h2>Promet po danu</h2>
          <div className="adminStats__revenueByDay__controls">
            <div className="adminStats__buttons">
              <button onClick={() => setStatsRevenu("day")}>Dan</button>
              <button onClick={() => setStatsRevenu("mjesec")}>Mjesec</button>
              <button onClick={() => setStatsRevenu("godina")}>Godina</button>
            </div>
            <div className="adminStats__revenueByDay__buttons">
              <button onClick={() => setChartType("bar")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="14"
                  viewBox="0 0 448 512"
                >
                  <path d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z" />
                </svg>
              </button>
              <button onClick={() => setChartType("line")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="16"
                  viewBox="0 0 512 512"
                >
                  <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z" />
                </svg>
              </button>
              <button onClick={() => setChartType("pie")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="18"
                  viewBox="0 0 576 512"
                >
                  <path d="M304 240V16.6c0-9 7-16.6 16-16.6C443.7 0 544 100.3 544 224c0 9-7.6 16-16.6 16H304zM32 272C32 150.7 122.1 50.3 239 34.3c9.2-1.3 17 6.1 17 15.4V288L412.5 444.5c6.7 6.7 6.2 17.7-1.5 23.1C371.8 495.6 323.8 512 272 512C139.5 512 32 404.6 32 272zm526.4 16c9.3 0 16.6 7.8 15.4 17c-7.7 55.9-34.6 105.6-73.9 142.3c-6 5.6-15.4 5.2-21.2-.7L320 288H558.4z" />
                </svg>
              </button>
            </div>
          </div>
          <canvas ref={dayChartRef}></canvas>
        </div>
      ) : statsRevenu === "mjesec" ? (
        <div className="adminStats__revenueByMonth">
          <h2>Promet po mjesecu</h2>
          <div className="adminStats__revenueByMonth__controls">
            <div className="adminStats__buttons">
              <button onClick={() => setStatsRevenu("day")}>Dan</button>
              <button onClick={() => setStatsRevenu("mjesec")}>Mjesec</button>
              <button onClick={() => setStatsRevenu("godina")}>Godina</button>
            </div>
            <div className="adminStats__revenueByMonth__buttons">
              <button onClick={() => setChartType("bar")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="14"
                  viewBox="0 0 448 512"
                >
                  <path d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z" />
                </svg>
              </button>
              <button onClick={() => setChartType("line")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="16"
                  viewBox="0 0 512 512"
                >
                  <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z" />
                </svg>
              </button>
              <button onClick={() => setChartType("pie")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="18"
                  viewBox="0 0 576 512"
                >
                  <path d="M304 240V16.6c0-9 7-16.6 16-16.6C443.7 0 544 100.3 544 224c0 9-7.6 16-16.6 16H304zM32 272C32 150.7 122.1 50.3 239 34.3c9.2-1.3 17 6.1 17 15.4V288L412.5 444.5c6.7 6.7 6.2 17.7-1.5 23.1C371.8 495.6 323.8 512 272 512C139.5 512 32 404.6 32 272zm526.4 16c9.3 0 16.6 7.8 15.4 17c-7.7 55.9-34.6 105.6-73.9 142.3c-6 5.6-15.4 5.2-21.2-.7L320 288H558.4z" />
                </svg>
              </button>
            </div>
          </div>
          <canvas ref={monthChartRef}></canvas>
        </div>
      ) : statsRevenu === "godina" ? (
        <div className="adminStats__revenueByYear">
          <h2>Promet po godini</h2>
          <div className="adminStats__revenueByYear__controls">
            <div className="adminStats__buttons">
              <button onClick={() => setStatsRevenu("day")}>Dan</button>
              <button onClick={() => setStatsRevenu("mjesec")}>Mjesec</button>
              <button onClick={() => setStatsRevenu("godina")}>Godina</button>
            </div>
            <div className="adminStats__revenueByYear__buttons">
              <button onClick={() => setChartType("bar")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="14"
                  viewBox="0 0 448 512"
                >
                  <path d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z" />
                </svg>
              </button>
              <button onClick={() => setChartType("line")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="16"
                  viewBox="0 0 512 512"
                >
                  <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z" />
                </svg>
              </button>
              <button onClick={() => setChartType("pie")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="18"
                  viewBox="0 0 576 512"
                >
                  <path d="M304 240V16.6c0-9 7-16.6 16-16.6C443.7 0 544 100.3 544 224c0 9-7.6 16-16.6 16H304zM32 272C32 150.7 122.1 50.3 239 34.3c9.2-1.3 17 6.1 17 15.4V288L412.5 444.5c6.7 6.7 6.2 17.7-1.5 23.1C371.8 495.6 323.8 512 272 512C139.5 512 32 404.6 32 272zm526.4 16c9.3 0 16.6 7.8 15.4 17c-7.7 55.9-34.6 105.6-73.9 142.3c-6 5.6-15.4 5.2-21.2-.7L320 288H558.4z" />
                </svg>
              </button>
            </div>
          </div>
          <canvas ref={yearChartRef}></canvas>
        </div>
      ) : null}
      ,
      <div className="adminStats__productsSales">
        <h2>Proizvodi</h2>
        <div className="adminsStats__productsSales__sortControls">
          <p>Sort:</p>
          <div className="adminStats__prductsSales__buttons">
            <button onClick={() => setProductsSort("quantityUp")}>UP</button>
            <button onClick={() => setProductsSort("revenueUp")}>UP</button>
          </div>
        </div>
        {productsStats.length > 0
          ? productsStats.map((product, index) => (
              <div key={index} className="productStats">
                <p className="productStats__title">
                  {index + 1}. {product[0]}
                </p>
                <div className="productStats__numbers">
                  <p className="productStats__quantity">
                    {product[1].quantity.toFixed(2)} kg
                  </p>
                  <p className="productStats__revenue">
                    {product[1].totalPrice.toFixed(2)} €
                  </p>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default AdminStats;
