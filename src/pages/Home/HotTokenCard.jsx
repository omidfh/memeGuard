import { useTokenInfo } from "../../hooks/getTokenInfo";
import { Avatar, Badge, Card, Flex, Text } from "@mantine/core";
import CustomLoader from "../../components/Loader";
import { useTokenPrice } from "../../hooks/getTokenPrice";
import { BiArrowToTop } from "react-icons/bi";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router";

export default function HotTokenCard({ address }) {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  const { data: token, isFetching, error } = useTokenInfo(address);
  const {
    data: price,
    isFetching: isFetching2,
    error: error2,
  } = useTokenPrice(address);

  if (isFetching || isFetching2) return <CustomLoader />;
  return (
    <Card
      onClick={() => navigate(`/token/${address}`)}
      shadow="lg"
      padding={"lg"}
      radius="md"
      bg={"rgba(0, 22, 84, 0.1)"}
      sx={{
        border: "1px solid rgba(255, 255, 255, 0.334)",
        transition:
          "transform 0.3s ease,background-color 0.2s ease , box-shadow 0.3s ease",
        "&:hover": {
          cursor: "pointer",
          transform: "scale(1.05)", // Slightly enlarge the card
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)", // Add a shadow effect
          backgroundColor: "rgba(7, 39, 134, 0.5)", // Slightly change the background color
        },
      }}
    >
      <Flex direction="column" align="center">
        {/* Token Logo and Name */}
        <Avatar
          src={token?.logo || ""}
          size={isSmallScreen ? 45 : "xl"}
          mb="sm"
          radius={100}
        />
        <Text color="white" weight={700} size={isSmallScreen ? "sm" : "lg"}>
          {token?.name || ""}
        </Text>
        <Text color="dimmed" size="sm" mt="xs">
          {token?.symbol || ""}
        </Text>
        <Text
          color="dimmed"
          size={isSmallScreen ? 10 : "sm"}
          mt="xs"
          maw={isSmallScreen ? "80px" : "180px"}
          lineClamp={1}
        >
          {token?.owner ? token.owner : "---"}
        </Text>
        <Text color="white" size={{ base: "sm", sm: 10 }} mt="xs" lineClamp={1}>
          {price ? price.price : ""}(USD)
        </Text>

        {/* Price Changes */}
        {/* <Flex justify="space-between" align={"center"} mt="md" width="100%">
          {price?.diff_24?.startsWith("−") && (
            <RiArrowDownSFill color="red" size={18} />
          )}
          {price?.diff_24?.startsWith("+") && (
            <RiArrowUpSFill color="green" size={20} />
          )}
          <Text
            color={
              price?.diff_24?.startsWith("-")
                ? "red"
                : price?.diff_24?.startsWith("+")
                ? "green"
                : "white"
            }
            size="xs"
          >
            {price?.diff_24}
          </Text>
        </Flex> */}

        {/* Risk Score */}
        <Badge
          // color={token.riskScore > 5 ? "red" : "green"}
          color={
            price?.diff_24?.startsWith("-")
              ? "red"
              : price?.diff_24?.startsWith("+")
              ? "green"
              : "white"
          }
          mt="sm"
        >
          <Flex justify="space-between" align={"center"} width="100%">
            last 24h :
            {price?.diff_24?.startsWith("−") && (
              <RiArrowDownSFill color="red" size={18} />
            )}
            {price?.diff_24?.startsWith("+") && (
              <RiArrowUpSFill color="green" size={20} />
            )}
            <Text
              color={
                price?.diff_24?.startsWith("−")
                  ? "red.9"
                  : price?.diff_24?.startsWith("+")
                  ? "green.9"
                  : "black"
              }
              size="xs"
            >
              {price?.diff_24}
            </Text>
          </Flex>
        </Badge>

        {/* Social and Issues */}
        <Text color="dimmed" size="sm" mt="sm">
          {token.socials}
        </Text>
        {/* {token.issues.map((issue, idx) => ( */}

        {/* ))} */}
      </Flex>
    </Card>
  );
}
