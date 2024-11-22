// TableBox.jsx
import { useState } from "react";
import { Tabs, Table, Box, Text, Flex, Button } from "@mantine/core";
import LittleChart from "./LittleChart";
import { useMediaQuery } from "@mantine/hooks";
import { Address } from "@ton/core";
import { IconCircleArrowDown } from "@tabler/icons-react";

export default function TableBox({
  holders,
  topTrades,
  topBuys,
  decimal,
  tokenInfo,
  setHolderLimit,
}) {
  const [activeTab, setActiveTab] = useState("Holders");
  const mainTabs = ["Holders", "Top Trades", "Top Buy", "Bubble Map"];
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  // Calculate total balance
  // Process holders data
  const holdersData = {
    headers: ["Wallet", "Ownership", "Amount"],
    rows: holders.map((holder) => ({
      address: Address.normalize(holder.address),
      ownership: (
        (holder.balance / Math.pow(10, decimal) / tokenInfo.totalSupply) *
        100
      ).toFixed(2),
      // ownership: ((holder.balance / totalBalance) * 100).toFixed(2),
      amount: formatAmount(Number(holder.balance), decimal),
    })),
  };

  const topTradesData = {
    headers: ["Wallet", "Volume", "Swaps"],
    rows: topTrades.map((trade) => ({
      wallet: trade.walletAddress,
      volume: formatAmount(Number(trade.volume), decimal),
      swaps: trade.swaps,
    })),
  };

  const topBuyData = {
    headers: ["Wallet", "Amount Bought", "Time"],
    rows: topBuys.map((buy) => ({
      wallet: buy.walletAddress,
      amount: formatAmount(Number(buy.amount), decimal),
      time: new Date(buy.ts)
        .toLocaleString("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
        .replace(",", " -"), // Replace comma with a dash for the desired format
    })),
  };

  function formatAmount(amount, decimal) {
    const divisor = Math.pow(10, decimal); // Calculate 10^decimal
    const formattedAmount = (amount / divisor).toLocaleString(undefined, {
      minimumFractionDigits: 2, // Always show at least 2 decimal places
      maximumFractionDigits: 2, // Show at most 2 decimal places
    });
    return formattedAmount;
  }

  return (
    <Box
      sx={{ marginTop: "2rem", borderRadius: "15px" }}
      bg="rgba(255, 255, 255, 0.1)"
      p={isSmallScreen ? 3 : 5}
      w={isSmallScreen ? "80%" : "100%"}
      mx={isSmallScreen ? "auto" : 0}
      miw={"80%"}
    >
      <Tabs value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List>
          {mainTabs.map((tab, i) => (
            <Tabs.Tab value={tab} key={i}>
              <Text color="#f0f0f0" size={isSmallScreen ? 9 : "md"}>
                {tab}
              </Text>
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {/* Holders Tab */}
        <Tabs.Panel value="Holders" pt="md">
          <Flex
            justify={"center"}
            mb={isSmallScreen ? "xs" : "md"}
            px={isSmallScreen ? 5 : 25}
          >
            <LittleChart
              holders={holdersData.rows}
              totalSupply={tokenInfo.totalSupply}
              decimal={decimal}
            />
          </Flex>

          {/* Responsive Table for Holders */}
          <Box
            sx={{
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
              width: "100%",
              maxHeight: "400px",
            }}
          >
            <Table
              withBorder
              verticalSpacing="sm"
              horizontalSpacing="md"
              miw={"430px"}
              sx={{
                "thead tr th": {
                  color: "#ffffffcc",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  fontSize: isSmallScreen ? "0.8rem" : "1rem", // Adjust font size for small screens
                },
                "tbody tr td": {
                  color: "#f0f0f0",
                  fontSize: isSmallScreen ? "0.8rem" : "1rem", // Adjust font size for small screens
                },
                borderColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <thead>
                <tr>
                  {holdersData.headers.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {holdersData.rows.map((row, index) => (
                  <tr key={index}>
                    <td align="left">{`${row.address.slice(
                      0,
                      6
                    )}...${row.address.slice(-4)}`}</td>
                    <td align="left">{row.ownership}%</td>
                    <td align="left">{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Flex w={"100%"} justify={"center"}>
              <Button
                variant="subtle"
                color="gray"
                onClick={() => setHolderLimit((limit) => limit + 5)}
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <IconCircleArrowDown />
                Load More ...
              </Button>
            </Flex>
          </Box>
        </Tabs.Panel>

        {/* Top Trades Tab */}
        <Tabs.Panel value="Top Trades" pt="md">
          <Box
            sx={{
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
              width: "100%",
              maxHeight: "400px",
            }}
          >
            <Table
              withBorder
              verticalSpacing="sm"
              horizontalSpacing="md"
              miw={"430px"}
              sx={{
                "thead tr th": {
                  color: "#ffffffcc",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  fontSize: isSmallScreen ? "0.8rem" : "1rem", // Adjust font size for small screens
                },
                "tbody tr td": {
                  color: "#f0f0f0",
                  fontSize: isSmallScreen ? "0.8rem" : "1rem", // Adjust font size for small screens
                },
                borderColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <thead>
                <tr>
                  {topTradesData.headers.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topTradesData.rows.map((row, index) => (
                  <tr key={index}>
                    <td align="left">{`${row.wallet.slice(
                      0,
                      6
                    )}...${row.wallet.slice(-4)}`}</td>
                    <td align="left">{row.volume}</td>
                    <td align="left">{row.swaps}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Box>
        </Tabs.Panel>

        {/* Top Buy Tab */}
        <Tabs.Panel value="Top Buy" pt="md">
          <Box
            sx={{
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
              width: "100%",
              maxHeight: "400px",
            }}
          >
            <Table
              withBorder
              verticalSpacing="sm"
              horizontalSpacing="md"
              miw={"430px"}
              sx={{
                "thead tr th": {
                  color: "#ffffffcc",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  fontSize: isSmallScreen ? "0.8rem" : "1rem", // Adjust font size for small screens
                },
                "tbody tr td": {
                  color: "#f0f0f0",
                  fontSize: isSmallScreen ? "0.8rem" : "1rem", // Adjust font size for small screens
                },
                borderColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <thead>
                <tr>
                  {topBuyData.headers.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topBuyData.rows.map((row, index) => (
                  <tr key={index}>
                    <td align="left">{`${row.wallet.slice(
                      0,
                      6
                    )}...${row.wallet.slice(-4)}`}</td>
                    <td align="left">{row.amount}</td>
                    <td align="left">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Box>
        </Tabs.Panel>

        {/* Map Tab */}
        <Tabs.Panel value="Bubble Map" pt="md">
          <Flex miw={"430px"} mih={50} justify={"center"}>
            <Text align="center" size="lg" color="#f0f0f0">
              Coming Soon
            </Text>
          </Flex>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}
