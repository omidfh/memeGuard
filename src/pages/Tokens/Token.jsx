import { SimpleGrid } from "@mantine/core";
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

export default function Token() {
  const { id } = useParams();
  const { data: tokenInfo, isFetching, error } = useTokenInfo(id);
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

  if (isFetching || isFetching2 || isFetching3) return <CustomLoader />;
  return (
    <>
      <SimpleGrid
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
      <TableBox />
    </>
  );
}
