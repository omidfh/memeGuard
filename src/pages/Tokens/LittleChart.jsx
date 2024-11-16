// LittleChart.jsx
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the components
ChartJS.register(ArcElement, Tooltip, Legend);

// Example usage of the component
const sampleData = {
  totalHolders: 4,
  holders: [
    { name: "Wallet A", percentage: 44 },
    { name: "Wallet B", percentage: 24 },
    { name: "Wallet C", percentage: 18 },
    { name: "Wallet D", percentage: 14 },
  ],
};

export default function LittleChart() {
  return <TokenHoldersChart data={sampleData} />;
}

const TokenHoldersChart = ({ data }) => {
  // Define modern, smooth colors
  const backgroundColors = [
    "rgba(255, 99, 132, 0.7)", // Pastel Red
    "rgba(54, 162, 235, 0.7)", // Pastel Blue
    "rgba(255, 206, 86, 0.7)", // Pastel Yellow
    "rgba(75, 192, 192, 0.7)", // Pastel Green
  ];

  const hoverBackgroundColors = [
    "rgba(255, 99, 132, 0.9)",
    "rgba(54, 162, 235, 0.9)",
    "rgba(255, 206, 86, 0.9)",
    "rgba(75, 192, 192, 0.9)",
  ];

  // Data for the chart
  const chartData = {
    labels: data.holders.map((holder) => holder.name),
    datasets: [
      {
        data: data.holders.map((holder) => holder.percentage),
        backgroundColor: backgroundColors,
        hoverBackgroundColor: hoverBackgroundColors,
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 10, // Rounded edges
        hoverBorderColor: "#fff",
      },
    ],
  };

  // Chart options for styling
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows custom height
    cutout: "70%", // Makes the doughnut thinner
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.7)",
        bodyColor: "#fff",
        titleColor: "#fff",
        borderColor: "#fff",
        borderWidth: 1,
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h4>Top Holders</h4>
      <div style={{ position: "relative", height: "300px" }}>
        <Doughnut data={chartData} options={options} />
      </div>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {data.holders.map((holder, index) => (
          <li
            key={index}
            style={{
              color: backgroundColors[index],
              fontSize: "16px",
              margin: "8px 0",
            }}
          >
            <strong>{holder.name}</strong>: {holder.percentage}%
          </li>
        ))}
      </ul>
      <p style={{ fontSize: "16px", fontWeight: "bold" }}>
        Total Holders: {data.totalHolders}
      </p>
    </div>
  );
};
