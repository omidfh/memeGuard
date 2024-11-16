import React from "react";
import { Card, Text, Button, Center, Divider, Stack } from "@mantine/core";
import GaugeChart from "react-gauge-chart";

export default function Score() {
  const score = 660; // Example score
  const minScore = 300;
  const maxScore = 850;

  // Calculate the percentage for the gauge chart
  const percentage = (score - minScore) / (maxScore - minScore);

  // Define your score ranges
  const ranges = [
    { label: "Poor", max: 580, color: "#f44336" },
    { label: "Fair", max: 670, color: "#ff9800" },
    { label: "Good", max: 740, color: "#8e44ad" },
    { label: "Excellent", max: 850, color: "#4caf50" },
  ];

  // Calculate arcsLength based on ranges
  const totalRange = maxScore - minScore;
  const arcsLength = ranges.map((range, index) => {
    const prevMax = index === 0 ? minScore : ranges[index - 1].max;
    return (range.max - prevMax) / totalRange;
  });

  // Extract colors
  const colors = ranges.map((range) => range.color);

  return (
    <Card shadow="sm" radius="md" padding="lg" style={{ maxWidth: 360 }}>
      {/* Title */}
      <Text weight={600} size="sm" mb="xs">
        Rug Check
      </Text>

      {/* Gauge Chart */}
      <Center>
        <div style={{ width: 300 }}>
          <GaugeChart
            id="credit-score-gauge"
            nrOfLevels={ranges.length}
            arcsLength={arcsLength}
            colors={colors}
            percent={percentage}
            arcPadding={0.02}
            needleColor="#464A4F"
            textColor="#000000"
            formatTextValue={() => `${score}`}
          />
        </div>
      </Center>

      {/* Credit Score Details */}
      <Stack align="center" spacing="xs" mt="sm">
        <Text size="sm" weight={600}>
          Not Secure
        </Text>
        <Text size="xs" color="dimmed">
          Last Check on 21 Apr
        </Text>
      </Stack>
    </Card>
  );
}
