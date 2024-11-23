import { Card, Flex, Text, Divider, ActionIcon, Avatar } from "@mantine/core";
import {
  IconBrandTelegram,
  IconBrandX,
  IconBrandInstagram,
  IconWorldWww,
  IconBrandTiktok,
} from "@tabler/icons-react";
import dex from "@/assets/dex.png";
import dyor from "@/assets/dyor.ico";
import geko from "@/assets/geko.png";

export default function Socials({ data }) {
  //EQAZwJdXCZoO9JIbwBTL2a_zzOAPheLICa4YG7lNIlDZzMmx
  function getSocialLink(link) {
    if (Array.isArray(link)) {
      return link[0];
    } else {
      return link;
    }
  }

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
      link: getSocialLink(data.socials?.twitter) || "",
      isActive: !!data.socials?.twitter,
      color: "black",
    },
    {
      icon: <IconBrandInstagram size={20} />,
      platform: "Instagram",
      label: "Instagram",
      link: getSocialLink(data.socials?.instagram) || "",
      isActive: !!data.socials?.instagram,
      color: "red.7",
    },
    {
      icon: <IconWorldWww size={20} />,
      platform: "website",
      label: "Website",
      link: getSocialLink(data.socials?.websites) || "",
      isActive: !!data.socials?.websites,
      color: "blue.7",
    },
    {
      icon: <IconBrandTelegram size={20} />,
      platform: "Telegram",
      label: "Telegram",
      link: getSocialLink(data.socials?.telegram) || "",
      isActive: !!data.socials?.telegram,
      color: "blue.7",
    },
  ];
  ////custom links
  const customLinks = [
    {
      icon: <IconBrandTiktok size={25} />,
      platform: "Tiktok",
      label: "Tiktok",
      link: getSocialLink(data.socials?.tiktok) || "",
      isActive: !!data.socials?.tiktok,
      color: "black",
    },
    {
      icon: <Avatar src={dex} size={25} />,
      platform: "dexscreener",
      label: "Dexscreener",
      link: getSocialLink(data.socials?.dexscreener) || "",
      isActive: !!data.socials?.dexscreener,
      color: "yellow.7",
    },
    {
      icon: <Avatar src={dyor} size={25} />,
      platform: "dyor",
      label: "dyor",
      link: getSocialLink(data.socials?.dyor) || "",
      isActive: !!data.socials?.dyor,
      color: "yellow.7",
    },
    {
      icon: <Avatar src={geko} size={25} />,
      platform: "gekoterminal",
      label: "gekoterminal",
      link: getSocialLink(data.socials?.gekoterminal) || "",
      isActive: !!data.socials?.gekoterminal,
      color: "yellow.7",
    },
  ];

  return (
    <Card
      bg={"rgba(236, 240, 241, 0.05)"}
      // withBorder
      shadow="sm"
      radius="md"
      p={"lg"}
      style={{
        maxWidth: 360,
        minWidth: 340,
        color: "white",
      }}
    >
      <Text weight={500} size="lg" style={{ marginBottom: "1rem" }}>
        Social Links
      </Text>
      <Flex direction={"column"} justify={"center"} h={"80%"}>
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
                color={link.isActive ? link.color : "gray"}
                bg={link.isActive ? "white" : "gray.5"}
                variant="light"
                radius="xl"
                component="a" // Render as <a> element
                href={link.isActive ? normalizeUrl(link.link) : null} // Set the link URL
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

        {/* PAIIN */}
        <Flex justify="space-around">
          {customLinks.map((icon, index) => (
            <ActionIcon
              color={icon.isActive ? icon.color : "gray"}
              bg={icon.isActive ? "white" : "gray.5"}
              key={index}
              size="xl"
              radius="xl"
              variant="light"
              component="a" // Render as <a> element
              href={icon.isActive ? normalizeUrl(icon.link) : null} // Set the link URL
              target="_blank" // Open in a new tab
              rel="noopener noreferrer"
            >
              {icon.icon}
            </ActionIcon>
          ))}
        </Flex>
      </Flex>
    </Card>
  );
}
