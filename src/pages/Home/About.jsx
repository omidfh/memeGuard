import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  Center,
  Flex,
  Divider,
} from "@mantine/core";
import { FaStar } from "react-icons/fa";

function AboutSection() {
  const features = [
    {
      title: "Top Holders",
      description:
        "Discover the largest holders of any token with ease. Our tool provides detailed insights into wallet distributions, making it simple to understand where the power lies.",
      icon: <FaStar color="yellow" />, // Replace this with an image or Mantine Icon if needed
    },
    {
      title: "Top Traders & Buyers",
      description:
        "Analyze the most active traders and buyers for any token. Get a clear view of trading patterns and activity, all in a beautifully designed, user-friendly interface.",
      icon: "✔️", // Replace this with an image or Mantine Icon if needed
    },
    {
      title: "Risk Score",
      description:
        "Instantly assess token safety with our proprietary score. At a glance, know whether a coin is safe or risky, empowering you to make informed decisions with confidence.",
      icon: "🚨", // Replace this with an image or Mantine Icon if needed
    },
  ];

  return (
    <Container
      maw={"88%"}
      mt="xl"
      mb="xl"
      p={"xl"}
      bg={"rgba(236, 240, 241, 0.04)"}
      sx={{
        borderRadius: "25px",
        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          // Slightly enlarge the card
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)", // Add a shadow effect
          backgroundColor: "rgba(236, 240, 241, 0.018)", // Slightly change the background color
        },
      }}
    >
      <Center my={"lg"}>
        <Flex direction={{ base: "column", xs: "row" }} gap={"md"}>
          <Flex align={"center"}>
            <Title size={35} align="center" order={2} color="white">
              About <span style={{ color: "#4c6ef5" }}>MemeGuard</span>
            </Title>
          </Flex>
          <Divider
            orientation={{ base: "horizontal", xs: "vertical" }}
            my={2}
            color="#fff"
            bg={"white"}
            sx={{ border: "1px solid #7d7d7d" }}
          />
          <Flex p={"md"} align={"center"}>
            <Text size="lg" color="gray.4" ta={"left"}>
              Our advanced whale tracking and analysis tool uses interactive
              charts and intuitive metrics, making it effortless to evaluate
              token activity, top holders, and safety risks across the TON
              ecosystem.
            </Text>
          </Flex>
        </Flex>
      </Center>
      <SimpleGrid
        cols={3}
        spacing="lg"
        mt="xl"
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        {features.map((feature, index) => (
          <Card
            key={index}
            shadow="sm"
            padding="lg"
            radius="md"
            bg={"rgba(7, 39, 134, 0.225)"}
            sx={{
              border: "0 0 1px 0 solid #ffffff",
              borderRadius: "15px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)", // Slightly enlarge the card
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)", // Add a shadow effect
                backgroundColor: "rgba(7, 39, 134, 0.5)", // Slightly change the background color
              },
            }}
          >
            <Center>
              <div
                style={{
                  fontSize: "2rem",
                  marginBottom: "10px",
                }}
              >
                {feature.icon}
              </div>
            </Center>
            <Text align="center" color="white" weight={700} size="lg" mt="sm">
              {feature.title}
            </Text>
            <Text align="center" color="gray.5" size="sm" mt="sm">
              {feature.description}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default AboutSection;
