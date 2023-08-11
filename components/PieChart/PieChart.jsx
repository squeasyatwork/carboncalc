import React from "react";
import "@app/globals.css";
import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

export default function PieChart(dset) {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});
  console.log(dset.dset);
  useEffect(() => {
    setChartData({
      labels: ["Gas", "Electricity", "Transport", "Diet"],
      datasets: [
        {
          data: [dset.dset[0], dset.dset[1], dset.dset[2], dset.dset[3]], // PLUG IN USER'S kgCO2 COMPOSITIONS HERE IN A DESCENDING SORT
          borderRadius: 10,
          borderWidth: 0,
          // borderColor: "rgb(50, 140, 90, 1)",
          backgroundColor: [
            "rgb(130, 20, 45, 1)",
            "rgb(200,80,56, 1)",
            "rgb(200, 160, 69, 1)",
            "rgb(40, 165, 150, 1)",
          ],
          hoverOffset: 5,
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
          align: "center",
          labels: {
            color: "lightgray",
            font: { family: "Raleway", weight: "normal", size: 20 },
          },
          fullSize: true,
        },
        title: {
          display: false,
          text: "Breakdown  of  Emission  Causes",
          color: "lightgray",
          font: { family: "Raleway", weight: "bold", size: "24" },
        },

        colors: {
          enabled: true,
          forceOverride: true,
        },
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

      // scales: {
      //   y: {
      //     border: {
      //       display: true,
      //       color: "rgb(50, 140, 90, 1)",
      //     },
      //     ticks: { color: "lightgray", font: { family: "Raleway" } },
      //     title: {
      //       display: true,
      //       text: "kWh's  of  electricity  used",
      //       color: "lightgray",
      //       font: { family: "Raleway", weight: "normal", size: "14" },
      //     },
      //     grid: {
      //       drawTicks: true,
      //       tickColor: "rgba(70, 170, 160, 0.3)",
      //       tickWidth: 1,
      //       color: "rgba(70, 170, 160, 0.3)",
      //       z: -1,
      //     },
      //   },
      //   x: {
      //     border: {
      //       display: true,
      //       color: "rgb(50, 140, 90, 1)",
      //     },
      //     ticks: {
      //       color: "lightgray",
      //       font: { family: "Raleway", weight: "normal", size: "14" },
      //     },
      //   },
      // },
      maintainAspectRatio: true,
      responsive: true,
    });
  }, []);

  return (
    <>
      <div id="pie_chart_wrapper">
        <Pie data={chartData} options={chartOptions} />
      </div>
    </>
  );
}
