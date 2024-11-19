import { useQuery } from "@tanstack/react-query";
import { tonApi } from "../apiConfig";
import { Address } from "@ton/core";

export function useTokenInfo(address) {
  return useQuery({
    queryKey: ["token-info", address],
    queryFn: () => fetchTokenInfo(address),
    enabled: !!address,
  });
}

async function fetchTokenInfo(contractAddress) {
  const response = await fetch(`${tonApi}/jettons/${contractAddress}`);
  const data = await response.json();

  const { total_supply, admin, metadata, verification, holders_count } = data;

  // Format total supply with decimal
  const totalSupply = Math.floor(
    +total_supply / Math.pow(10, +metadata.decimals)
  );

  // Check for owner
  const burnerAddress =
    "0:0000000000000000000000000000000000000000000000000000000000000000";
  const owner =
    admin?.address === burnerAddress || !admin?.address
      ? "revoked"
      : Address.normalize(admin?.address);

  // socials
  let links;
  let SOCIAL_MEDIA_TYPES;
  let socials;
  if (metadata.social) {
    links = [
      ...new Set([...(metadata.social || []), ...(metadata.websites || [])]),
    ];
    SOCIAL_MEDIA_TYPES = {
      "t.me": "telegram",
      "x.com": "twitter",
      "twitter.com": "twitter",
      "tiktok.com": "tiktok",
      "instagram.com": "instagram",
    };
    socials = {
      telegram: [],
      twitter: [],
      tiktok: [],
      instagram: [],
      websites: [],
      gekoterminal: `geckoterminal.com/ton/pools/${contractAddress}`,
      dexscreener: `dexscreener.com/ton/${contractAddress}`,
      dyor: `dyor.io/token/${contractAddress}`,
    };
  }

  const categorizeLink = (link) => {
    if (!link) return;

    const url = link.toLowerCase();
    const socialType = Object.entries(SOCIAL_MEDIA_TYPES).find(([key]) =>
      url.includes(key)
    );

    if (socialType) {
      socials[socialType[1]].push(link); // Now socials[socialType[1]] exists
    }
    if (
      url.startsWith("http") &&
      !url.includes("t.me") &&
      !url.includes("x.com") &&
      !url.includes("twitter.com")
    ) {
      socials.websites.push(link);
    }
  };

  links?.forEach(categorizeLink);

  return {
    name: metadata.name,
    symbol: metadata.symbol,
    mintable: owner === "revoked" ? "disabled" : "enabled",
    mutable: owner === "revoked" ? "disabled" : "enabled",
    totalSupply,
    owner,
    logo: metadata.image,
    socials,
    verification,
    holdersCount: holders_count,
    decimals: metadata.decimals,
    isScam: admin?.is_scam,
  };
}
