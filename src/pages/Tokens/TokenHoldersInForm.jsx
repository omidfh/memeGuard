import React from "react";
import { Flex, Text, Card } from "@mantine/core";
import { IconTrendingUp, IconStar, IconDatabase } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

const AnimatedTokenHolders = ({ topDetails }) => {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const statsData = [
    {
      label: "Total Whales",
      value: topDetails.whales,
      icon: IconStar,
      color: "#fdcb6e",
    },
    {
      label: "Top 3 Holders",
      value: `${topDetails.top3}%`,
      icon: IconTrendingUp,
      color: "#00b894",
    },
    {
      label: "Top 10 Holders",
      value: `${topDetails.top10}%`,
      icon: IconDatabase,
      color: "#0984e3",
    },
  ];

  return (
    <Card
      bg="transparent"
      className="w-full"
      //   style={{ background: "rgba(0,0,0,0.2)" }}
    >
      <Flex direction="column" gap={isSmallScreen ? "sm" : "md"}>
        {statsData.map((stat) => (
          <Card
            key={stat.label}
            bg="transparent"
            withBorder
            radius="md"
            className="hover:scale-[1.02] transition-transform duration-300"
          >
            <Flex align="center" gap={isSmallScreen ? "sm" : "md"}>
              <stat.icon size={isSmallScreen ? 12 : 24} color={stat.color} />
              <Flex direction="column">
                <Text color="white" size={isSmallScreen ? 10 : "sm"}>
                  {stat.label}
                </Text>
                <Text
                  color="white"
                  size={isSmallScreen ? 10 : "lg"}
                  weight={700}
                >
                  {stat.value}
                </Text>
              </Flex>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Card>
  );
};

export default AnimatedTokenHolders;
