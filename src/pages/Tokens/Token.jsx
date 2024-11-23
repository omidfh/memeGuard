import {
  Avatar,
  Container,
  Flex,
  Loader,
  SimpleGrid,
  Text,
} from "@mantine/core";
import React, { useState } from "react";
import Crypto from "./Crypto";
import Score from "./Score";
import Socials from "./Socials";
import TableBox from "./TableBox";
import { useNavigate, useParams } from "react-router";
import { useTokenInfo } from "../../hooks/getTokenInfo";
import { useTokenPrice } from "../../hooks/getTokenPrice";
import { useTokenHolders } from "../../hooks/getTokenHolders";
import { useMediaQuery } from "@mantine/hooks";
import { useTokenTopTrades } from "../../hooks/getTopTraders";
import { useTokenTopBuys } from "../../hooks/getTopBuys";
import BlobLoader from "../BlobLoader";
import CustomLoader from "../../components/Loader";
import image from "@/assets/secondlogo.png";
import { IoArrowBackOutline } from "react-icons/io5";

export default function Token() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  if (isFetching || isFetching2) return <BlobLoader size={10} />;
  return (
    <>
      <Flex
        ml={isSmallScreen ? 90 : 60}
        p={10}
        sx={{ borderRadius: "25px", cursor: "pointer" }}
        bg={"rgba(236, 240, 241, 0.05)"}
        w={isSmallScreen ? "45%" : "20%"}
        align={"center"}
        gap={10}
        onClick={() => navigate(-1)}
      >
        <Avatar src={image} radius={50} />
        <IoArrowBackOutline color="white" />
        <Text color="white">Meme Guard</Text>
      </Flex>
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
            <CustomLoader color="indigo" variant="bars" />
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
            <CustomLoader color="indigo" variant="bars" />
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
    </>
  );
}
