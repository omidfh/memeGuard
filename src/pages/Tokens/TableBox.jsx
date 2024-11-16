// TableBox.jsx
import React, { useState } from "react";
import { Tabs, Table, Box, Text, Container } from "@mantine/core";
import LittleChart from "./LittleChart";

export default function TableBox() {
  const [activeTab, setActiveTab] = useState("holders");

  // Dummy data for each tab
  const holdersData = {
    headers: ["Holder Address", "Balance", "Percentage"],
    rows: [
      ["0xABC...123", "1000", "10%"],
      ["0xDEF...456", "800", "8%"],
      ["0xGHI...789", "600", "6%"],
    ],
  };

  const topTradesData = {
    headers: ["Trader", "Trade Volume", "Number of Trades"],
    rows: [
      ["Trader A", "$5000", "50"],
      ["Trader B", "$4000", "40"],
      ["Trader C", "$3000", "30"],
    ],
  };

  const topBuyData = {
    headers: ["Buyer", "Amount Bought", "Time"],
    rows: [
      ["Buyer X", "$2000", "10:00 AM"],
      ["Buyer Y", "$1500", "10:30 AM"],
      ["Buyer Z", "$1000", "11:00 AM"],
    ],
  };

  return (
    <Box sx={{ width: "100%", marginTop: "2rem" }} bg={"white"}>
      <Tabs value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="holders">Holders</Tabs.Tab>
          <Tabs.Tab value="top-trades">Top Trades</Tabs.Tab>
          <Tabs.Tab value="top-buy">Top Buy</Tabs.Tab>
          <Tabs.Tab value="map">Map</Tabs.Tab>
        </Tabs.List>

        {/* Holders Tab */}
        <Tabs.Panel value="holders" pt="md">
          {/* Remove fixed height to allow the chart to display properly */}
          <Container>
            <Box
              sx={{
                width: "200px",
                //   height: "200px",
                marginBottom: "16px",
                backgroundColor: "#f0f0f0",
              }}
            >
              <LittleChart />
            </Box>
          </Container>

          {/* Table for Holders */}
          <Table withBorder highlightOnHover>
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
                  {row.map((cell, idx) => (
                    <td key={idx}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Tabs.Panel>

        {/* Top Trades Tab */}
        <Tabs.Panel value="top-trades" pt="md">
          {/* Table for Top Trades */}
          <Table withBorder highlightOnHover>
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
                  {row.map((cell, idx) => (
                    <td key={idx}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Tabs.Panel>

        {/* Top Buy Tab */}
        <Tabs.Panel value="top-buy" pt="md">
          {/* Table for Top Buy */}
          <Table withBorder highlightOnHover>
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
                  {row.map((cell, idx) => (
                    <td key={idx}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Tabs.Panel>

        {/* Map Tab */}
        <Tabs.Panel value="map" pt="md">
          {/* Map tab content */}
          <Text align="center" size="lg">
            Coming Soon
          </Text>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}
