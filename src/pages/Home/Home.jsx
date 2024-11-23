// Home.jsx
import {
  Container,
  Title,
  Text,
  Divider,
  TextInput,
  Center,
  Space,
  Image,
  ActionIcon,
  Flex,
  Notification,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { IconClipboard, IconSearch, IconX } from "@tabler/icons-react";
import image from "@/assets/secondlogo.png";
import HotTokensSection from "./HotTokens";
import AboutSection from "./About";
import { useTokenValidation } from "../../hooks/getTokenValidation";
import { useNavigate } from "react-router";
import BlobLoader from "../BlobLoader";
import { FaRobot, FaTelegram } from "react-icons/fa";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const [enabled, setEnabled] = useState(false);
  const [notification, setNotification] = useState(null);

  const { data, isFetching, isError, error, refetch } = useTokenValidation(
    searchQuery,
    enabled
  );

  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setNotification({
        title: "Error",
        message: "Empty Token Field!",
        color: "red",
        icon: <IconX size={16} />,
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }
    setEnabled(true);
    refetch();
  };

  useEffect(() => {
    if (data !== undefined) {
      if (data) {
        // The token is valid
        navigate(`/token/${searchQuery}`);
      } else {
        // The token is not valid
        setNotification({
          title: "Error",
          message: "Invalid token!",
          color: "red",
          icon: <IconX size={16} />,
        });
        setTimeout(() => setNotification(null), 3000);
      }
    }
  }, [data, searchQuery, navigate]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setSearchQuery(text);
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  const handleRowClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (isFetching) return <BlobLoader size={100} />;
  return (
    <>
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
          <form onSubmit={handleSearch} style={{ width: "100%" }}>
            <Flex justify={"center"}>
              <TextInput
                placeholder="Search for a meme coin..."
                size="md"
                radius={"xl"}
                // icon={

                // }
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.currentTarget.value)}
                style={{ width: "100%", maxWidth: 500 }}
                rightSection={
                  <Flex gap={15}>
                    <ActionIcon
                      variant="subtle"
                      onClick={handlePaste}
                      radius={50}
                      color="blue"
                      right={10}
                      bg={"white"}
                    >
                      <IconClipboard size={20} />
                    </ActionIcon>

                    <ActionIcon
                      variant="subtle"
                      onClick={handleSearch}
                      radius={50}
                      color="blue"
                      right={20}
                    >
                      <IconSearch size={20} onClick={handleSearch} />
                    </ActionIcon>
                  </Flex>
                }
              />
            </Flex>
          </form>
        </Center>
        <Space h="xl" />
        {/* Features Section */}
        <Space my="xl" />
        <Container maw={"90%"}>
          <HotTokensSection />
        </Container>
        {/* Why Choose Us Section */}
        <AboutSection />
        <Divider
          my="xl"
          label="Why Choose Us?"
          labelPosition="center"
          labelProps={{ color: "white" }}
        />
        <Text align="center" size="md" mt="lg" color="dimmed">
          MemeGuard is dedicated to ensuring the safety and transparency of your
          investments on TON. With real-time data, an intuitive interface, and
          detailed analysis tools, we empower you to invest with confidence.
        </Text>

        <Flex
          w={"100%"}
          justify={"space-evenly"}
          my={10}
          p={25}
          sx={{ borderRadius: "25px" }}
          gap={15}
        >
          <Flex
            align={"center"}
            gap={5}
            onClick={() => handleRowClick(`https://t.me/memeguardton`)}
            sx={{ cursor: "pointer" }}
          >
            <FaTelegram color="blue" size={25} />
            <Text color="white">TG Channel</Text>
          </Flex>

          <Flex
            align={"center"}
            gap={5}
            onClick={() => handleRowClick(`t.me/Meme_guard_bot/MemeGuard`)}
            sx={{ cursor: "pointer" }}
          >
            <FaRobot color="white" size={25} />
            <Text lineClamp={1} color="white">
              TG Bot
            </Text>
          </Flex>
        </Flex>
      </Container>
      {notification && (
        <Notification
          title={notification.title}
          color={notification.color}
          icon={notification.icon}
          onClose={() => setNotification(null)}
          sx={{
            position: "fixed",
            top: "1rem",
            right: "1rem",
            zIndex: 1000,
          }}
        >
          {notification.message}
        </Notification>
      )}
    </>
  );
}
