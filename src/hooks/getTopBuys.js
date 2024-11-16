import { useQuery } from "@tanstack/react-query";
import { tonApi, dedustApi } from "../apiConfig";

export function useTokenTopBuys(address) {
  return useQuery({
    queryKey: ["token-buys", address],
    queryFn: () => fetchTopBuys(address),
    enabled: !!address,
  });
}

async function fetchTopBuys(contractAddress) {
  const response = await fetch(
    `${dedustApi}/jettons/${contractAddress}/top-buys`
  );
  const data = await response.json();
  return data;
}
