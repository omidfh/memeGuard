import { Container, Flex, SimpleGrid } from "@mantine/core";
import React, { useState } from "react";
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
  const [holderLimit, setHolderLimit] = useState(15);
  const {
    data: price,
    isFetching: isFetching2,
    error: error2,
  } = useTokenPrice(id);
  const {
    data: holders,
    isFetching: isFetching3,
    error: error3,
  } = useTokenHolders({ address: id, holderLimit });
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

  if (isFetching || isFetching2) return <CustomLoader />;
  return (
    <Flex
      justify={"center"}
      direction={"column"}
      px={"xl"}
      pt={"xs"}
      pb={1}
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
        {isFetching3 ? (
          <CustomLoader />
        ) : (
          <Score
            holders={holders}
            tokenInfo={tokenInfo}
            topTrades={topTrades}
          />
        )}
        <Socials data={tokenInfo} />
      </SimpleGrid>
      <Flex maw={"100%"} justify={"center"} pb={0} pt={"md"} px={"lg"}>
        {isFetching3 || isFetching4 || isFetching5 ? (
          <CustomLoader />
        ) : (
          <TableBox
            setHolderLimit={setHolderLimit}
            tokenInfo={tokenInfo}
            holders={holders}
            topTrades={topTrades}
            topBuys={topBuys}
            decimal={tokenInfo.decimals}
          />
        )}
      </Flex>
    </Flex>
  );
}
