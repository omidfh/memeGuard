import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box, Flex, Text, Title } from "@mantine/core";

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
        borderWidth: 0,
        borderColor: "#0000002",
        borderRadius: 10, // Rounded edges
        hoverBorderColor: "#ffffff4",
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
        position: "right",
        labels: {
          color: "#ffffff", // Light text for legend labels
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.615)",
        bodyColor: "#000",
        titleColor: "#000",
        borderColor: "#060606",
        borderWidth: 0,
      },
    },
  };

  return (
    <Flex justify={"center"} align={"center"} mah={300} w={"100%"}>
      <Box maw={200}>
        {/* <Title>Top Holders</Title> */}
        <Doughnut data={chartData} options={options} />
      </Box>
      {/* <Flex direction={"column"} bg={"white"}>
        {data.holders.map((holder, index) => (
          <Text
            key={index}
            style={{
              color: backgroundColors[index],
              fontSize: "16px",
              margin: "8px 0",
            }}
          >
            <strong>{holder.name}</strong>: {holder.percentage}%
          </Text>
        ))}
      </Flex> */}
      {/* <p style={{ fontSize: "16px", fontWeight: "bold" }}>
        Total Holders: {data.totalHolders}
      </p> */}
    </Flex>
  );
};
