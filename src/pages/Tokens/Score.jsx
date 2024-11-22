import { useEffect, useState } from "react";
import { Card, Text, Center, Stack } from "@mantine/core";
import GaugeChart from "react-gauge-chart";
import { exchangeWallets } from "../../apiConfig";
import { Address } from "@ton/core";

export default function Score({ holders, tokenInfo }) {
  const [finalScore, setFinalScore] = useState(0);

  //OwnerShip Clac
  function ownershipCalc(holderBalance) {
    const decimal = Number(tokenInfo.decimals);
    const answer = (
      (+holderBalance / Math.pow(10, +decimal) / tokenInfo.totalSupply) *
      100
    ).toFixed(2);
    return answer;
  }

  //holders calc
  const processedHolders = holders?.map((holder) => {
    const balance = Number(holder.balance);
    return {
      address: Address.normalize(holder.address),
      balance: holder.balance,
      ownership: parseFloat(ownershipCalc(balance, tokenInfo.totalSupply)),
    };
  });

  //except exchanges
  const filteredWhales = processedHolders?.filter(
    (holder) => !exchangeWallets.includes(holder.address)
  );
  console.log(filteredWhales);

  // top3 calc

  const top5Holders = processedHolders
    ?.slice(0, 5)
    .reduce((sum, holder) => sum + holder.ownership, 0);

  // top10 calc
  const top10Holders = processedHolders
    ?.slice(0, 10)
    .reduce((sum, holder) => sum + holder.ownership, 0);

  console.log(tokenInfo);
  console.log(top5Holders, top10Holders);

  ///Points Conditions
  useEffect(() => {
    let aditionalScore = 0;
    // 1.
    if (tokenInfo.owner === "revoked") aditionalScore += 20;
    // 2.
    if (tokenInfo?.socials) aditionalScore += 20;
    // 3.
    if (tokenInfo.isScam === false) aditionalScore += 20;

    // 4.
    if (tokenInfo.verification === "whitelist") aditionalScore += 15;

    // 5.
    if (tokenInfo.holdersCount > 1000) {
      aditionalScore += 15;
    } else if (500 < tokenInfo.holdersCount && tokenInfo.holdersCount >= 1000) {
      aditionalScore += 10;
    } else if (100 < tokenInfo.holdersCount && tokenInfo.holdersCount >= 500) {
      aditionalScore += 5;
    }

    // 6.
    if (top5Holders < 20) {
      aditionalScore += 10;
    } else if (top5Holders > 20 && top5Holders < 30) {
      aditionalScore += 5;
    }

    //7.
    if (top10Holders < 35) {
      aditionalScore += 5;
    } else if (top10Holders > 35 && top10Holders < 50) {
      aditionalScore += 2;
    }

    setFinalScore(aditionalScore);
  }, [tokenInfo, holders]);

  useEffect(() => {}, []);

  console.log(holders);
  console.log(finalScore);

  const score = finalScore; // Example score
  const minScore = 0;
  const maxScore = 100;

  // Calculate the percentage for the gauge chart
  const percentage = (score - minScore) / (maxScore - minScore);

  // Define your score ranges
  const ranges = [
    { label: "Poor", max: 30, color: "#f44336" },
    { label: "Fair", max: 60, color: "#ff9800" },
    { label: "Good", max: 80, color: "#8e44ad" },
    { label: "Excellent", max: 100, color: "#4caf50" },
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
    <Card
      shadow="sm"
      radius="md"
      padding="lg"
      maw={360}
      bg={"rgba(236, 240, 241, 0.05)"}
    >
      {/* Title */}
      <Text weight={600} size="sm" mb="xs" color="white">
        Rug Check
      </Text>

      {/* Gauge Chart */}
      <Center>
        <div style={{ maxWidth: 300 }}>
          <GaugeChart
            id="credit-score-gauge"
            nrOfLevels={ranges.length}
            arcsLength={arcsLength}
            colors={colors}
            percent={percentage}
            arcPadding={0.02}
            needleColor="#c4d0df"
            textColor="#ffffff"
            formatTextValue={() => `${score}`}
          />
        </div>
      </Center>

      {/* Credit Score Details */}
      <Stack align="center" spacing="xs" mt="sm">
        <Text size="sm" weight={600} color="white">
          Not Secure
        </Text>
        <Text size="xs" color="gray.2">
          Last Check on 21 Apr
        </Text>
      </Stack>
    </Card>
  );
}
