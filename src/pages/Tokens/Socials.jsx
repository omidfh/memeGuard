import React from "react";
import { Card, Flex, Text, Group, Divider, ActionIcon } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandReddit,
  IconBrandTelegram,
  IconBrandGithub,
} from "@tabler/icons-react";

export default function Socials() {
  const socialLinks = [
    {
      icon: <IconBrandTwitter size={20} />,
      platform: "Followers",
      label: "X",
    },
    {
      icon: <IconBrandFacebook size={20} />,
      platform: "Likes",
      label: "Facebook",
    },
    {
      icon: <IconBrandReddit size={20} />,
      platform: "Subscribers",
      label: "Reddit",
    },
    {
      icon: <IconBrandTelegram size={20} />,
      platform: "Members",
      label: "Telegram",
    },
  ];

  const additionalIcons = [
    {
      icon: <IconBrandGithub size={20} />,
      label: "GitHub",
    },
    {
      icon: (
        <div
          style={{
            backgroundColor: "purple",
            borderRadius: "50%",
            width: 20,
            height: 20,
          }}
        />
      ),
      label: "Custom 1",
    },
    {
      icon: (
        <div
          style={{
            backgroundColor: "green",
            borderRadius: "50%",
            width: 20,
            height: 20,
          }}
        />
      ),
      label: "Custom 2",
    },
    {
      icon: (
        <div
          style={{
            backgroundColor: "indigo",
            borderRadius: "50%",
            width: 20,
            height: 20,
          }}
        />
      ),
      label: "Custom 3",
    },
  ];

  return (
    <Card
      withBorder
      shadow="sm"
      radius="md"
      style={{
        width: 300,
        backgroundColor: "#1A1B1E",
        color: "white",
      }}
    >
      <Text weight={500} size="lg" style={{ marginBottom: "1rem" }}>
        Social Links:
      </Text>

      <Flex
        gap="sm"
        wrap="wrap"
        align="center"
        style={{ justifyContent: "space-between" }}
      >
        {socialLinks.map((link, index) => (
          <Flex
            key={index}
            direction="column"
            align="center"
            style={{ width: "48px" }}
          >
            <ActionIcon
              size="lg"
              variant="light"
              radius="xl"
              //   style={{ color: "white" }}
            >
              {link.icon}
            </ActionIcon>
            <Text
              size="xs"
              style={{ textAlign: "center", marginTop: "0.5rem" }}
            >
              {link.platform}
            </Text>
          </Flex>
        ))}
      </Flex>

      <Divider my="md" color="gray" />

      <Flex justify="space-around">
        {additionalIcons.map((icon, index) => (
          <ActionIcon
            key={index}
            size="xl"
            radius="xl"
            variant="light"
            // style={{ color: "white" }}
          >
            {icon.icon}
          </ActionIcon>
        ))}
      </Flex>
    </Card>
  );
}
