// src/components/CustomLoader.jsx
import React from "react";
import { Center, Loader, Text } from "@mantine/core";

function CustomLoader({
  message = "Loading...",
  size = "md",
  variant = "oval",
  color = "blue",
}) {
  return (
    <Center style={{ flexDirection: "column", minHeight: "50vh" }}>
      <Loader size={size} variant={variant} color={color} />
      <Text mt="md" color="dimmed">
        {message}
      </Text>
    </Center>
  );
}

export default CustomLoader;
