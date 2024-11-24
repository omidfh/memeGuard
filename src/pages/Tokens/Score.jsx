import { useEffect, useState } from "react";
import { Card, Text, Center, Stack, Divider } from "@mantine/core";
import GaugeChart from "react-gauge-chart";
import { exchangeWallets } from "../../apiConfig";
import { Address } from "@ton/core";

export default function Score({ holders, tokenInfo }) {
  const [finalScore, setFinalScore] = useState(0);
  const [scoreStatus, setScoreStatus] = useState({ status: "", color: "" });

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
    if (tokenInfo.verification === "whitelist") aditionalScore += 35;

    // 4.
    if (tokenInfo.holdersCount > 1000) {
      aditionalScore += 20;
    } else if (500 < tokenInfo.holdersCount && tokenInfo.holdersCount >= 1000) {
      aditionalScore += 15;
    } else if (100 < tokenInfo.holdersCount && tokenInfo.holdersCount >= 500) {
      aditionalScore += 10;
    }

    // 5.
    if (top5Holders < 20) {
      aditionalScore += 10;
    } else if (top5Holders > 20 && top5Holders < 30) {
      aditionalScore += 5;
    }

    //6.
    if (top10Holders < 35) {
      aditionalScore += 5;
    } else if (top10Holders > 35 && top10Holders < 50) {
      aditionalScore += 2;
    }

    setFinalScore(aditionalScore);

    if (aditionalScore < 30) {
      setScoreStatus({ status: "Not Secure", color: "#f44336" });
    } else if (aditionalScore >= 30 && aditionalScore < 60) {
      setScoreStatus({ status: "Low Security", color: "#ff9800" });
    } else if (aditionalScore >= 60 && aditionalScore < 80) {
      setScoreStatus({ status: "Moderate Security", color: "#44ad71" });
    } else {
      setScoreStatus({ status: "High Security", color: "#4c7daf" });
    }
  }, [tokenInfo, holders]);

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
    { label: "Good", max: 80, color: "#44ad71" },
    { label: "Excellent", max: 100, color: "#4c7daf" },
  ];

  // Calculate arcsLength based on ranges
  const totalRange = maxScore - minScore;
  const arcsLength = ranges.map((range, index) => {
    const prevMax = index === 0 ? minScore : ranges[index - 1].max;
    return (range.max - prevMax) / totalRange;
  });

  // Extract colors
  const colors = ranges.map((range) => range.color);

  const currentDateTime = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  });
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
        <Text size="md" weight={600} color={scoreStatus.color}>
          {scoreStatus.status}
        </Text>
        <Text size="xs" color="gray.2">
          {currentDateTime}
        </Text>
      </Stack>
      <Stack mt={20}>
        <Text size={10} color="white">
          <Divider my={5} />
          MemeGuard strives to provide you with the best insights and
          information, but remember—always do your own research (DYOR) before
          making any decisions.
        </Text>
      </Stack>
    </Card>
  );
}
