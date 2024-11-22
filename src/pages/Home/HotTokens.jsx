import { Title, SimpleGrid, Center, Flex } from "@mantine/core";
import { FaFire } from "react-icons/fa";
import { tokenAddress } from "./hotTokensAddress";
import HotTokenCard from "./HotTokenCard";
import { useMediaQuery } from "@mantine/hooks";

function HotTokensSection() {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const tokensToShow = isSmallScreen ? tokenAddress.slice(0, 3) : tokenAddress;

  return (
    <Flex
      direction={"column"}
      p={"lg"}
      bg={"rgba(236, 240, 241, 0.04)"}
      sx={{
        // border: "1px solid ",
        borderRadius: "25px",
        borderColor: "rgba(187, 205, 255, 0.3)",
      }}
    >
      <Center>
        <Title color="white">Hot Tokens </Title>{" "}
        <FaFire color="orange" size={28} />
      </Center>
      <SimpleGrid
        cols={3}
        spacing="xl"
        verticalSpacing={"xl"}
        p={{ base: "xl", sm: "sm" }}
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        {tokensToShow.map((token, index) => (
          <HotTokenCard address={token} key={index} />
        ))}
      </SimpleGrid>
    </Flex>
  );
}

export default HotTokensSection;
