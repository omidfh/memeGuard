import {
  Card,
  Group,
  Text,
  Title,
  Divider,
  Flex,
  Avatar,
  Select,
  Box,
} from "@mantine/core";
import {
  FaDollarSign,
  FaArrowDown,
  FaArrowUp,
  FaCaretDown,
  FaRegCheckCircle,
} from "react-icons/fa";
import logo from "../../assets/btc.webp";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IconCopy } from "@tabler/icons-react";

export default function Crypto() {
  return (
    <Card shadow="sm" padding="lg" radius="md" style={{ maxWidth: 360 }}>
      {/* Default Currency */}
      <Flex mb="sm" align={"center"} justify={"space-between"}>
        <Flex align={"center"}>
          <Avatar src={logo} radius={100} size={"lg"} />

          <Text size={15}>$BitCoin</Text>
        </Flex>
        <Text size={12} color="dimmed">
          0.007 USD
        </Text>
      </Flex>
      <Divider my={10} />
      {/* My Balance */}
      <Flex direction={"column"} gap={5}>
        <Flex direction={"column"} align={"start"} gap={4}>
          {/* ADRESS */}
          <Flex align={"center"} justify={"space-between"} w={"100%"}>
            <Text color="black" size={12} align="centers">
              Address
              {/* <IconCopy size={12} /> */}
            </Text>
            <Text size={12} maw={100} lineClamp={2} truncate="end" i>
              0xbccd27062ae1a2bea5731c904b96edfb163aba21
            </Text>
          </Flex>
          {/* SUPPLY */}
          <Flex align={"center"} justify={"space-between"} w={"100%"}>
            <Text color="black" size={12}>
              Supply
            </Text>
            <Text size={12}>-----</Text>
          </Flex>
          {/* MC */}
          <Flex align={"center"} justify={"space-between"} w={"100%"}>
            <Text color="black" size={12}>
              MC
            </Text>
            <Text size={12}>-----</Text>
          </Flex>
          {/* OWNER */}
          <Flex align={"center"} justify={"space-between"} w={"100%"}>
            <Text color="black" size={12}>
              Owner
            </Text>
            <Text size={12}>-----</Text>
          </Flex>
        </Flex>
      </Flex>

      <Divider my={10} />

      {/* Income and Expenses */}
      <Flex position="apart" gap={10} justify={"space-between"}>
        <Card shadow="sm" padding="sm" radius="md" bg={"green.1"}>
          <FaRegCheckCircle color="green" />
          <Flex direction={"column"} align={"center"} p={1}>
            <Text size="xs" weight={500} color="dimmed" transform="capitalize">
              mint authority
            </Text>

            <Text size={10} color="green.9">
              Disabled
            </Text>
          </Flex>
        </Card>

        <Card shadow="sm" padding="sm" radius="md" bg={"red.1"}>
          <IoIosCloseCircleOutline color="red" size={19} />
          <Flex direction={"column"} p={1}>
            <Text size="xs" weight={500} color="dimmed" transform="capitalize">
              mute authority
            </Text>

            <Text size={10} color="red.9">
              Enabled
            </Text>
          </Flex>
        </Card>
      </Flex>
    </Card>
  );
}
