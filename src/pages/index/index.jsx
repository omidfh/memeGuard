// Home.jsx
import {
  Container,
  Title,
  Text,
  Button,
  Card,
  SimpleGrid,
  Divider,
  TextInput,
  Center,
  Space,
  Image,
  Flex,
  ActionIcon,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import image from "../../assets/th.jpeg";
import { FaFire } from "react-icons/fa";
import HotTokensSection from "./HotTokens";
import AboutSection from "./About";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Redirect to the check page with the search query
    // Assuming you have a route that can handle the search query
    window.location.href = `/check?token=${searchQuery}`;
  };

  return (
    <Container maw={"100%"}>
      {/* Hero Section */}
      <Center>
        <Image
          src={image}
          alt="MemeGuard Logo"
          width={150}
          m={"auto"}
          radius={"100%"}
          fit="cover"
        />
      </Center>
      <Title align="center" order={1} mt="md" color="white">
        Welcome to <span style={{ color: "#4c6ef5" }}>MemeGuard</span>
      </Title>
      <Text align="center" color="dimmed" size="lg" mt="md">
        Secure your investments with our TON-based Rug Checker.
      </Text>
      {/* Search Bar */}
      <Center mt="xl" px={"md"}>
        <TextInput
          placeholder="Search for a meme coin..."
          size="md"
          radius={"xl"}
          // icon={<IconSearch size={18} />}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
          style={{ width: "100%", maxWidth: 500 }}
          rightSection={
            <ActionIcon
              variant="subtle"
              right={10}
              onClick={handleSearch}
              radius={50}
              color="blue"
            >
              <IconSearch size={20} onClick={handleSearch} />
            </ActionIcon>
          }
        />
      </Center>
      <Space h="xl" />
      {/* Features Section */}
      <Space my="xl" />
      <Container maw={"90%"}>
        <HotTokensSection />
      </Container>
      {/* Why Choose Us Section */}
      <AboutSection />
      <Divider my="xl" label="Why Choose Us?" labelPosition="center" />
      <Text align="center" size="md" mt="lg" color="dimmed">
        MemeGuard is dedicated to ensuring the safety and transparency of your
        investments on TON. With real-time data, an intuitive interface, and
        detailed analysis tools, we empower you to invest with confidence.
      </Text>
    </Container>
  );
}

export default Home;
