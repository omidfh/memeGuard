import { Container, Flex, SimpleGrid } from "@mantine/core";
import React from "react";
import Crypto from "./Crypto";
import Score from "./Score";
import Socials from "./Socials";
import TableBox from "./TableBox";
import { useParams } from "react-router";
import { useTokenInfo } from "../../hooks/getTokenInfo";
import CustomLoader from "../../components/Loader";
import { useTokenPrice } from "../../hooks/getTokenPrice";
import { useTokenHolders } from "../../hooks/getTokenHolders";
import { useMediaQuery } from "@mantine/hooks";
import { useTokenTopTrades } from "../../hooks/getTopTraders";
import { useTokenTopBuys } from "../../hooks/getTopBuys";

export default function Token() {
  const { id } = useParams();
  const { data: tokenInfo, isFetching, error } = useTokenInfo(id);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const {
    data: price,
    isFetching: isFetching2,
    error: error2,
  } = useTokenPrice(id);
  const {
    data: holders,
    isFetching: isFetching3,
    error: error3,
  } = useTokenHolders(id);
  const {
    data: topTrades,
    isFetching: isFetching4,
    error: error4,
  } = useTokenTopTrades(id);
  const {
    data: topBuys,
    isFetching: isFetching5,
    error: error5,
  } = useTokenTopBuys(id);

  console.log(tokenInfo);
  if (isFetching || isFetching2 || isFetching3 || isFetching4 || isFetching5)
    return <CustomLoader />;
  return (
    <Flex
      justify={"center"}
      direction={"column"}
      px={"xl"}
      py={"xs"}
      sx={{ overflowX: "hidden" }}
      w={"100%"}
    >
      <SimpleGrid
        sx={{ "justify-items": "center" }}
        cols={3}
        spacing="xl"
        verticalSpacing={"xl"}
        p={"xl"}
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        <Crypto data={tokenInfo} price={price} />
        <Score holders={holders} />
        <Socials data={tokenInfo} />
      </SimpleGrid>
      <Flex maw={"100%"} justify={"center"} p={"lg"}>
        <TableBox
          holders={holders}
          topTrades={topTrades}
          topBuys={topBuys}
          decimal={tokenInfo.decimals}
        />
      </Flex>
    </Flex>
  );
}
