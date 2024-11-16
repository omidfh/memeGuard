import {
  Container,
  Title,
  Text,
  Card,
  SimpleGrid,
  Center,
  Flex,
  Badge,
  Avatar,
} from "@mantine/core";
import { FaFire } from "react-icons/fa";

// Dummy data for hot tokens
const hotTokens = [
  {
    name: "T.R.U.M.P",
    logo: "https://via.placeholder.com/50", // Replace with actual logo URL
    symbol: "TRUMP",
    price: "$0.0000057",
    riskScore: 5,
    socials: "No social media",
    issues: [
      "Pump.fun contracts can be changed at any time",
      "Bonding curve not complete",
    ],
    priceChanges: {
      "30m": "-10.71%",
      "1h": "-10.71%",
      "4h": "-10.71%",
      "24h": "-10.71%",
    },
  },
  {
    name: "Infinity SOL",
    logo: "https://via.placeholder.com/50", // Replace with actual logo URL
    symbol: "SOL",
    price: "$1.23",
    riskScore: 7,
    socials: "Active on Twitter",
    issues: ["Token distribution incomplete", "High developer control"],
    priceChanges: {
      "30m": "-2.43%",
      "1h": "-5.71%",
      "4h": "-3.21%",
      "24h": "-1.21%",
    },
  },
  {
    name: "ShibaSwap",
    logo: "https://via.placeholder.com/50", // Replace with actual logo URL
    symbol: "SHIBA",
    price: "$0.000032",
    riskScore: 4,
    socials: "Twitter, Telegram",
    issues: ["Unverified contracts", "Limited liquidity"],
    priceChanges: {
      "30m": "-0.15%",
      "1h": "-0.43%",
      "4h": "+1.21%",
      "24h": "+3.56%",
    },
  },
  {
    name: "Rocket Inu",
    logo: "https://via.placeholder.com/50", // Replace with actual logo URL
    symbol: "ROCKET",
    price: "$0.00012",
    riskScore: 8,
    socials: "Inactive social media",
    issues: ["Token burn mechanism unclear", "Whale-dominated"],
    priceChanges: {
      "30m": "-8.12%",
      "1h": "-15.34%",
      "4h": "-20.45%",
      "24h": "-25.78%",
    },
  },
  {
    name: "ElonMars",
    logo: "https://via.placeholder.com/50", // Replace with actual logo URL
    symbol: "ELON",
    price: "$0.001",
    riskScore: 3,
    socials: "Active on Discord",
    issues: ["Low trading volume", "Small market cap"],
    priceChanges: {
      "30m": "+0.25%",
      "1h": "+0.87%",
      "4h": "+2.12%",
      "24h": "+4.89%",
    },
  },
  {
    name: "MoonBoy",
    logo: "https://via.placeholder.com/50", // Replace with actual logo URL
    symbol: "MOON",
    price: "$2.34",
    riskScore: 6,
    socials: "Twitter, Instagram",
    issues: ["Potential rug pull indicators", "High developer control"],
    priceChanges: {
      "30m": "-1.12%",
      "1h": "-3.43%",
      "4h": "-5.78%",
      "24h": "-8.23%",
    },
  },
];

function HotTokensSection() {
  return (
    <Flex
      direction={"column"}
      p={"lg"}
      bg={"rgba(236, 240, 241, 0.04)"}
      sx={{
        // border: "1px solid ",
        borderRadius: "25px",
        borderColor: "rgba(187, 205, 255, 0.3)",
      }}
    >
      <Center>
        <Title color="white">Hot Tokens </Title>{" "}
        <FaFire color="orange" size={28} />
      </Center>
      <SimpleGrid
        cols={3}
        spacing="xl"
        verticalSpacing={"xl"}
        p={"xl"}
        breakpoints={[{ maxWidth: "md", cols: 2 }]}
      >
        {hotTokens.map((token, index) => (
          <Card
            key={index}
            shadow="lg"
            padding="lg"
            radius="md"
            bg={"rgba(0, 22, 84, 0.1)"}
            sx={{
              border: "1px solid rgba(255, 255, 255, 0.334)",
              transition:
                "transform 0.3s ease,background-color 0.2s ease , box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)", // Slightly enlarge the card
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)", // Add a shadow effect
                backgroundColor: "rgba(7, 39, 134, 0.5)", // Slightly change the background color
              },
            }}
          >
            <Flex direction="column" align="center">
              {/* Token Logo and Name */}
              <Avatar src={token.logo} size="xl" mb="sm" />
              <Text color="white" weight={700} size="lg">
                {token.name}
              </Text>
              <Text color="dimmed" size="sm" mt="xs">
                {token.symbol} - {token.price}
              </Text>

              {/* Price Changes */}
              <Flex justify="space-between" mt="md" width="100%">
                {Object.entries(token.priceChanges).map(([time, change]) => (
                  <Text key={time} color="dimmed" size="xs">
                    {time}: {change}
                  </Text>
                ))}
              </Flex>

              {/* Risk Score */}
              <Badge color={token.riskScore > 5 ? "red" : "green"} mt="sm">
                Risk Score: {token.riskScore} / 10
              </Badge>

              {/* Social and Issues */}
              <Text color="dimmed" size="sm" mt="sm">
                {token.socials}
              </Text>
              {token.issues.map((issue, idx) => (
                <Text key={idx} color="dimmed" size="xs" mt="xs">
                  • {issue}
                </Text>
              ))}
            </Flex>
          </Card>
        ))}
      </SimpleGrid>
    </Flex>
  );
}

export default HotTokensSection;
