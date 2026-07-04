"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

import { Bar, Line, Pie } from "react-chartjs-2";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
);

export function PieChart({labels , dataset1}) {
  console.log("Boy : " + labels);
  console.log("Hah : " + dataset1);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Categories",
        data: dataset1,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(53, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(53, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    type: "pie",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Pie Chart",
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
}

export function LineChart({monthsData, dataset1, dataset2}) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

const labels = monthsData;

const data = {
  labels,
  datasets: [
    {
      label: 'Outgoings',
      data: dataset2,
      borderColor: 'red',
      backgroundColor: 'red',
    },
    {
      label: 'Incomings',
      data: dataset1,
      borderColor: 'green',
      backgroundColor: 'green',
    },
  ],
};

return <Line data={data} options={options} />;
}