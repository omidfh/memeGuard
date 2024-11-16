import { useQuery } from "@tanstack/react-query";
import { dedustApi } from "../apiConfig";

export function useTokenTopTrades(address) {
  return useQuery({
    queryKey: ["token-trades", address],
    queryFn: () => fetchTopTraders(address),
    enabled: !!address,
  });
}

async function fetchTopTraders(contractAddress) {
  const response = await fetch(
    `${dedustApi}/jettons/${contractAddress}/top-traders`
  );
  const data = await response.json();
  return data;
}
