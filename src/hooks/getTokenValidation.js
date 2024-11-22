import { useQuery } from "@tanstack/react-query";
import { tonApi } from "../apiConfig";

export function useTokenValidation(address, enabled) {
  return useQuery({
    queryKey: ["token-validate", address],
    queryFn: () => checkJettonMaster(address),
    enabled: enabled && !!address,
  });
}

async function checkJettonMaster(contractAddress) {
  const response = await fetch(`${tonApi}/accounts/${contractAddress}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.interfaces?.[0] === "jetton_master";
}
