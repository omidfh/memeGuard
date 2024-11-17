import { Card, Flex, Text, Divider, ActionIcon } from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandReddit,
  IconBrandTelegram,
  IconBrandGithub,
  IconBrandX,
  IconBrandInstagram,
} from "@tabler/icons-react";

export default function Socials({ data }) {
  console.log(data);

  function normalizeUrl(url) {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return `https://${url}`;
  }
  const socialLinks = [
    {
      icon: <IconBrandX size={20} />,
      platform: "X",
      label: "X",
      link: data.socials?.twitter[0] || "",
    },
    {
      icon: <IconBrandInstagram size={20} />,
      platform: "Instagram",
      label: "Instagram",
      link: data.socials?.instagram[0] || "",
    },
    {
      icon: <IconBrandReddit size={20} />,
      platform: "Subscribers",
      label: "Reddit",
    },
    {
      icon: <IconBrandTelegram size={20} />,
      platform: "Telegram",
      label: "Telegram",
      link: data.socials?.telegram[0] || "",
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
        maxWidth: 360,
        minWidth: 340,
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
              component="a" // Render as <a> element
              href={normalizeUrl(link.link)} // Set the link URL
              target="_blank" // Open in a new tab
              rel="noopener noreferrer"
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
