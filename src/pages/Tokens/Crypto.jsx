import {
  Card,
  Text,
  Divider,
  Flex,
  Avatar,
  Box,
  ActionIcon,
  Notification,
  Portal,
} from "@mantine/core";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IconCopy, IconCheck, IconX } from "@tabler/icons-react";
import { useParams } from "react-router";
import { useState } from "react";

export default function Crypto({ data, price }) {
  const { id } = useParams();
  const [notification, setNotification] = useState(null);
  function setColor(status) {
    if (status === "disabled") {
      return {
        bg: "green.1",
        icon: "green",
        text: "green.9",
      };
    } else if (status === "enabled") {
      return {
        bg: "red.1",
        icon: "red",
        text: "red.9",
      };
    }
  }

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Success
        setNotification({
          title: "Copied",
          message: "Text copied to clipboard",
          color: "green",
          icon: <IconCheck size={16} />,
        });
        // Auto-hide notification after 3 seconds
        setTimeout(() => setNotification(null), 3000);
      })
      .catch((err) => {
        // Error
        setNotification({
          title: "Error",
          message: "Failed to copy address",
          color: "red",
          icon: <IconX size={16} />,
        });
        // Auto-hide notification after 3 seconds
        setTimeout(() => setNotification(null), 3000);
        console.error("Could not copy text: ", err);
      });
  };

  return (
    <>
      <Card
        bg={"rgba(236, 240, 241, 0.05)"}
        shadow="sm"
        padding="lg"
        radius="md"
        style={{ maxWidth: 360, minWidth: 340 }}
      >
        {/* Default Currency */}
        <Flex mb="sm" align={"center"} justify={"space-between"}>
          <Flex align={"center"} gap={6}>
            <Avatar src={data?.logo} radius={100} size={"lg"} />

            <Text color="white" size={18} weight={500} maw={"50px"}>
              {data.name}
            </Text>
          </Flex>
          <Text size={18} color="white" weight={600}>
            {price.price} $
          </Text>
        </Flex>
        <Divider my={10} />
        {/* Details */}
        <Flex direction={"column"} gap={5} justify={"space-evenly"}>
          {/* <Flex direction={"column"} align={"start"} gap={4}> */}
          {/* Symbol */}
          <Flex align={"center"} justify={"space-between"} w={"100%"}>
            <Text color="white" size={12} align="centers">
              Symbol
            </Text>
            <Text
              color="white"
              size={12}
              maw={100}
              lineClamp={2}
              truncate="end"
              i
            >
              {data.symbol}
            </Text>
          </Flex>
          {/* ADRESS */}
          <Flex align={"center"} justify={"space-between"} w={"100%"}>
            <Flex align={"center"} gap={4}>
              <Text color="white" size={12}>
                Address
              </Text>
              <ActionIcon
                onClick={() => handleCopy(id)}
                color="white"
                p={0}
                pos={"absolute"}
                left={80}
              >
                <IconCopy size={12} color="white" />
              </ActionIcon>
            </Flex>
            <Box>
              <Text
                color="white"
                size={12}
                maw={100}
                lineClamp={1}
                truncate={true}
              >
                {id.slice(0, 5) + "..." + id.slice(id.length - 5, -1)}
              </Text>
            </Box>
          </Flex>
          {/* SUPPLY */}
          <Flex align={"center"} justify={"space-between"} w={"100%"}>
            <Text color="white" size={12}>
              Supply
            </Text>
            <Text color="white" size={12}>
              {data.totalSupply.toLocaleString()}
            </Text>
          </Flex>
          {/* MC */}
          <Flex align={"center"} justify={"space-between"} w={"100%"}>
            <Text color="white" size={12}>
              Market Cap
            </Text>
            <Text color="white" size={12}>
              {(data.totalSupply * price.price).toLocaleString()}
            </Text>
          </Flex>
          {/* OWNER */}
          <Flex align={"center"} justify={"space-between"} w={"100%"}>
            <Text color="white" size={12}>
              Owner
            </Text>
            <ActionIcon
              onClick={() => handleCopy(data.owner)}
              color="white"
              p={0}
              pos={"absolute"}
              left={80}
            >
              <IconCopy size={12} color="white" />
            </ActionIcon>
            <Text size={12} align="center" color="white">
              {data.owner && data.owner.length > 10
                ? data.owner.slice(0, 5) + "..." + id.slice(id.length - 5, -1)
                : data.owner || "----"}
              {/* {id.slice(0, 5) + "..." + id.slice(id.length - 5, -1)} */}
            </Text>
          </Flex>
          {/* </Flex> */}
        </Flex>

        <Divider my={10} />

        {/* Income and Expenses */}
        <Flex position="apart" gap={10} justify={"space-between"}>
          <Card
            shadow="sm"
            padding="sm"
            radius="md"
            bg={setColor(data.mintable).bg}
          >
            {data.mintable === "disabled" && (
              <FaRegCheckCircle color={setColor(data.mintable).icon} />
            )}
            {data.mintable === "enabled" && (
              <IoIosCloseCircleOutline color={setColor(data.mintable).icon} />
            )}
            <Flex direction={"column"} align={"center"} p={1}>
              <Text
                size="xs"
                weight={500}
                color="dimmed"
                transform="capitalize"
              >
                mint authority
              </Text>

              <Text size={10} color={setColor(data.mintable).text}>
                {data?.mintable?.toUpperCase()}
              </Text>
            </Flex>
          </Card>

          <Card
            shadow="sm"
            padding="sm"
            radius="md"
            bg={setColor(data.mutable).bg}
          >
            {data.mutable === "disabled" && (
              <FaRegCheckCircle color={setColor(data.mutable).icon} />
            )}
            {data.mutable === "enabled" && (
              <IoIosCloseCircleOutline color={setColor(data.mutable).icon} />
            )}
            <Flex direction={"column"} p={1}>
              <Text
                size="xs"
                weight={500}
                color="dimmed"
                transform="capitalize"
              >
                mute authority
              </Text>

              <Text size={10} color={setColor(data.mutable).text}>
                {/* Enabled */}
                {data?.mutable?.toUpperCase()}
              </Text>
            </Flex>
          </Card>
        </Flex>
      </Card>
      {/* Notification */}
      {notification && (
        <Portal>
          <div style={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}>
            <Notification
              title={notification.title}
              color={notification.color}
              icon={notification.icon}
              onClose={() => setNotification(null)}
              disallowClose={false}
            >
              {notification.message}
            </Notification>
          </div>
        </Portal>
      )}
    </>
  );
}
