import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box, Flex, Text, Title } from "@mantine/core";
import { useTokenHolders } from "../../hooks/getTokenHolders";
import { useParams } from "react-router";
import CustomLoader from "../../components/Loader";
import { useMediaQuery } from "@mantine/hooks";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function LittleChart({ holders, totalSupply, decimal }) {
  const { id } = useParams();
  const {
    data: fetchedHolders,
    isFetching: isFetching3,
    error: error3,
  } = useTokenHolders({ address: id, holderLimit: 1000 });

  if (isFetching3) return <CustomLoader />;
  function setAddress(address) {
    return `${address.slice(0, 5)}...${address.slice(address.length - 5, -1)}`;
  }
  const chartData = {
    totalHolders: 5,
    holders: [
      {
        name: setAddress(holders[0].address),
        percentage: holders[0].ownership,
      },
      {
        name: setAddress(holders[1].address),
        percentage: holders[1].ownership,
      },
      {
        name: setAddress(holders[2].address),
        percentage: holders[2].ownership,
      },
      {
        name: setAddress(holders[3].address),
        percentage: holders[3].ownership,
      },
      {
        name: setAddress(holders[4].address),
        percentage: holders[4].ownership,
      },
    ],
  };
  function ownershipCalc(holderBalance) {
    //holderBalance = each fetchedHolder.balance
    const answer = (
      (+holderBalance / Math.pow(10, +decimal) / +totalSupply) *
      100
    ).toFixed(2);
    return answer;
  }
  const processedHolders = fetchedHolders.map((holder) => ({
    address: holder.address,
    balance: holder.balance,
    ownership: parseFloat(ownershipCalc(holder.balance, totalSupply)),
  }));

  const top3Holders = processedHolders
    .slice(0, 3)
    .reduce((sum, holder) => sum + holder.ownership, 0);

  const top10Holders = processedHolders
    .slice(0, 10)
    .reduce((sum, holder) => sum + holder.ownership, 0);

  const whalesCount = processedHolders.filter(
    (holder) => holder.ownership > 0.5
  ).length;

  console.log("1", top3Holders, "2", top10Holders, "3", whalesCount);
  const topDetails = {
    top3: top3Holders,
    top10: top10Holders,
    whales: whalesCount,
  };
  return <TokenHoldersChart data={chartData} topDetails={topDetails} />;
}

const TokenHoldersChart = ({ data, topDetails }) => {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const isMediumScreen = useMediaQuery("(max-width: 991px)");
  // Define modern, smooth colors
  const backgroundColors = [
    "rgba(255, 99, 132, 0.7)", // Pastel Red
    "rgba(54, 162, 235, 0.7)", // Pastel Blue
    "rgba(255, 206, 86, 0.7)", // Pastel Yellow
    "rgba(75, 192, 192, 0.7)", // Pastel Green
    "rgba(126, 75, 192, 0.7)", // Pastel Green
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
        spacing: 3,
        borderColor: "#0000002",
        borderRadius: 10,
        hoverBorderColor: "#ffffff4",
      },
    ],
  };

  // Chart options for styling
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
    layout: {
      padding: {
        left: 10,
        right: 30, // Increased right padding for labels
        top: 10,
        bottom: 10,
        padding: 15,
      },
    },
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#ffffff",
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            size: isSmallScreen ? 9 : 12, // Adjusted font size
            family: "system-ui",
          },
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
    <Flex justify={"space-between"} align={"center"} mah={300} w={"100%"}>
      <Flex justify={"start"} direction={"column"}>
        <Text color="white">Top 5 Holders</Text>
        <Box w={isSmallScreen ? "200px" : "300px"}>
          <Doughnut data={chartData} options={options} />
        </Box>
      </Flex>
      <Flex
        direction={"column"}
        align={"center"}
        justify={"center"}
        gap={15}
        mt={25}
      >
        <Flex gap={10}>
          <Text size={isSmallScreen ? 12 : 16} color="white">
            Total Whales :
          </Text>
          <Text size={isSmallScreen ? 12 : 16} color="white">
            {topDetails.whales}
          </Text>
        </Flex>

        <Flex gap={10}>
          <Text size={isSmallScreen ? 12 : 16} color="white">
            Top 3 Holders :
          </Text>
          <Text size={isSmallScreen ? 12 : 16} color="white">
            {topDetails.top3}
          </Text>
        </Flex>

        <Flex gap={10}>
          <Text size={isSmallScreen ? 12 : 16} color="white">
            Top 10 Holders :
          </Text>
          <Text size={isSmallScreen ? 12 : 16} color="white">
            {topDetails.top10}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
