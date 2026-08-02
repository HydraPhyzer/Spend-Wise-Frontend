"use client";

import { useEffect, useState } from "react";
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
  Filler,
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
  Filler,
);

const LIGHT = {
  text: "#16171A",
  text2: "#5B5E65",
  text3: "#8B8E95",
  line: "#E4E4DF",
  grid: "rgba(22,23,26,.08)",
  surface: "#FFFFFF",
  accent: "#3B5BDB",
  pos: "#1B7A5A",
  neg: "#B03329",
  categorical: [
    "#3B5BDB",
    "#1B7A5A",
    "#A9760C",
    "#B03329",
    "#6B5BA8",
    "#2E7C9B",
    "#8B8E95",
  ],
};

const DARK = {
  text: "#ECEDEF",
  text2: "#9BA0A9",
  text3: "#6A6F78",
  line: "#262A31",
  grid: "rgba(237,238,240,.08)",
  surface: "#14161A",
  accent: "#7B93F5",
  pos: "#4FBF95",
  neg: "#F07A70",
  categorical: [
    "#7B93F5",
    "#4FBF95",
    "#DFA940",
    "#F07A70",
    "#A895E6",
    "#6BB8D6",
    "#9BA0A9",
  ],
};

/** Tracks the active theme so chart.js (which needs concrete colours) follows it. */
function useChartTheme() {
  const [tokens, setTokens] = useState(LIGHT);

  useEffect(() => {
    const read = () =>
      setTokens(
        document.documentElement.getAttribute("data-theme") === "dark"
          ? DARK
          : LIGHT,
      );

    read();

    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return tokens;
}

const fontStack =
  "var(--font-plex-mono), ui-monospace, SFMono-Regular, monospace";

const baseLegend = (t) => ({
  position: "bottom",
  labels: {
    color: t.text2,
    boxWidth: 9,
    boxHeight: 9,
    usePointStyle: true,
    pointStyle: "rectRounded",
    padding: 16,
    font: { family: fontStack, size: 11 },
  },
});

const baseTooltip = (t) => ({
  backgroundColor: t.surface,
  titleColor: t.text,
  bodyColor: t.text2,
  borderColor: t.line,
  borderWidth: 1,
  padding: 10,
  cornerRadius: 6,
  displayColors: true,
  titleFont: { family: fontStack, size: 11 },
  bodyFont: { family: fontStack, size: 11 },
});

export function PieChart({ labels, dataset1 }) {
  const t = useChartTheme();

  const data = {
    labels,
    datasets: [
      {
        label: "Spend",
        data: dataset1,
        backgroundColor: (labels || []).map(
          (_, i) => t.categorical[i % t.categorical.length],
        ),
        borderColor: t.surface,
        borderWidth: 2,
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: baseLegend(t),
      tooltip: baseTooltip(t),
      title: { display: false },
    },
  };

  return <Pie data={data} options={options} />;
}

export function LineChart({ monthsData, dataset1, dataset2 }) {
  const t = useChartTheme();

  const data = {
    labels: monthsData,
    datasets: [
      {
        label: "Incomings",
        data: dataset1,
        borderColor: t.accent,
        backgroundColor: `${t.accent}22`,
        borderWidth: 2,
        pointRadius: 2.5,
        pointBackgroundColor: t.accent,
        tension: 0.3,
        fill: true,
      },
      {
        label: "Outgoings",
        data: dataset2,
        borderColor: t.neg,
        backgroundColor: `${t.neg}18`,
        borderWidth: 1.75,
        pointRadius: 2.5,
        pointBackgroundColor: t.neg,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: baseLegend(t),
      tooltip: baseTooltip(t),
      title: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { color: t.line },
        ticks: { color: t.text3, font: { family: fontStack, size: 10 } },
      },
      y: {
        grid: { color: t.grid },
        border: { display: false },
        ticks: { color: t.text3, font: { family: fontStack, size: 10 } },
      },
    },
  };

  return <Line data={data} options={options} />;
}

export function BarChart({ labels, dataset1, label = "Amount" }) {
  const t = useChartTheme();

  const data = {
    labels,
    datasets: [
      {
        label,
        data: dataset1,
        backgroundColor: t.accent,
        borderRadius: 3,
        maxBarThickness: 34,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: baseLegend(t),
      tooltip: baseTooltip(t),
      title: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { color: t.line },
        ticks: { color: t.text3, font: { family: fontStack, size: 10 } },
      },
      y: {
        grid: { color: t.grid },
        border: { display: false },
        ticks: { color: t.text3, font: { family: fontStack, size: 10 } },
      },
    },
  };

  return <Bar data={data} options={options} />;
}
