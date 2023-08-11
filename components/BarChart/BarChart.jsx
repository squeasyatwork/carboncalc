import React from "react";
import "@app/globals.css";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Utils,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({ electricityValues, gasValues }) {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: ["Your  neighborhood", "You", "Victoria  average"],
      datasets: [
        {
          label: "Emissions from electricity usage",
          data: electricityValues, // PLUG IN 3 VALUES FROM THE DATABASE HERE IN THE ORDER: [NEIGHBORHOOD, USER, NATIONAL AVERAGE]
          borderWidth: 2,
          borderRadius: 10,
          borderColor: "rgb(50, 140, 90, 1)",
          backgroundColor: "rgba(30, 90, 70, 1)",
          // barPercentage: 0.8,
        },
        {
          label: "Emissions from gas usage",
          data: gasValues, // PLUG IN 3 VALUES FROM THE DATABASE HERE IN THE ORDER: [NEIGHBORHOOD, USER, NATIONAL AVERAGE]
          borderWidth: 2,
          borderRadius: 10,
          borderColor: "rgb(50, 140, 90, 1)",
          backgroundColor: "rgb(255, 205, 86)",
          // barPercentage: 0.8,
        },
      ],
    });

    setChartOptions({
      layout: {
        autoPadding: true,
      },
      plugins: {
        legend: {
          display: true,
          position: "top",
          align: "end",
          labels: { color: "lightgray" },
        },
        title: {
          display: false,
          text: "Average  Electricity  Used",
          color: "lightgray",
          font: { family: "Raleway", weight: "bold", size: "24" },
        },

        // colors: {
        //   enabled: true,
        //   forceOverride: true,
        // },
      },

      // animations: {
      //   tension: {
      //     duration: 1000,
      //     easing: "linear",
      //     from: 1,
      //     to: 0,
      //     loop: true,
      //   },
      // },

      // scales: {
      //   y: {
      //     // defining min and max so hiding the dataset does not change scale range
      //     min: 0,
      //     max: 100,
      //   },
      // },

      scales: {
        y: {
          border: {
            display: true,
            color: "rgb(50, 140, 90, 1)",
          },
          ticks: { color: "lightgray", font: { family: "Raleway" } },
          title: {
            display: true,
            text: "KGCO₂ of emissions",
            color: "lightgray",
            font: { family: "Raleway", weight: "normal", size: "20" },
          },
          grid: {
            drawTicks: true,
            tickColor: "rgba(70, 170, 160, 0.3)",
            tickWidth: 1,
            color: "rgba(70, 170, 160, 0.3)",
            z: -1,
          },
          stacked: true,
        },
        x: {
          border: {
            display: true,
            color: "rgb(50, 140, 90, 1)",
          },
          ticks: {
            color: "lightgray",
            font: { family: "Raleway", weight: "normal", size: "20" },
          },
          stacked: true,
        },
      },
      maintainAspectRatio: true,
      responsive: true,
      interaction: {
        intersect: true,
      },
    });
  }, []);

  return (
    <>
      <div id="bar_chart_wrapper">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
}
