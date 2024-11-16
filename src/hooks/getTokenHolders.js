import { useQuery } from "@tanstack/react-query";
import { tonApi, holderLimit } from "../apiConfig";

export function useTokenHolders(address) {
  return useQuery({
    queryKey: ["token-holders", address],
    queryFn: () => fetchTokenHolders(address),
    enabled: !!address,
  });
}

async function fetchTokenHolders(contractAddress) {
  const response = await fetch(
    `${tonApi}/jettons/${contractAddress}/holders?limit=${holderLimit}`
  );
  const data = await response.json();
  return data.addresses;
}
