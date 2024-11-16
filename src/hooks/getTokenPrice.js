import { useQuery } from "@tanstack/react-query";
import { tonApi } from "../apiConfig";

export function useTokenPrice(address) {
  return useQuery({
    queryKey: ["token-price", address],
    queryFn: () => fetchTokenPrice(address),
    enabled: !!address,
  });
}

async function fetchTokenPrice(contractAddress) {
  const response = await fetch(
    `${tonApi}/rates?tokens=${contractAddress}&currencies=usd`
  );
  const data = await response.json();

  const price = data.rates[contractAddress]?.prices?.USD;

  // format price, gets 3 digits after the first non zero digit
  const priceStr = price.toString();
  const nonZeroMatch = priceStr.match(/\.?0*[1-9]/);
  const firstNonZeroIndex = nonZeroMatch
    ? nonZeroMatch.index + nonZeroMatch[0].match(/[1-9]/).index
    : 0;
  return {
    price: priceStr.substring(0, firstNonZeroIndex + 3),
    diff_24: data.rates[contractAddress]?.diff_24h.USD,
  };
}
