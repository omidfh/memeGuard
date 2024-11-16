import { SimpleGrid } from "@mantine/core";
import React from "react";
import Crypto from "./Crypto";
import Score from "./Score";
import Socials from "./Socials";
import TableBox from "./TableBox";

export default function Token() {
  return (
    <>
      <SimpleGrid
        cols={3}
        spacing="xl"
        verticalSpacing={"xl"}
        p={"xl"}
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        <Crypto />
        <Score />
        <Socials />
      </SimpleGrid>
      <TableBox />
    </>
  );
}
