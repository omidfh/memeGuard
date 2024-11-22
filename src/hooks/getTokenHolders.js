import { useQuery } from "@tanstack/react-query";
import { tonApi } from "../apiConfig";
import { Address } from "@ton/core";

export function useTokenHolders({ address, holderLimit }) {
  return useQuery({
    queryKey: ["token-holders", address, holderLimit],
    queryFn: () => fetchTokenHolders({ contractAddress: address, holderLimit }),
    enabled: !!address,
  });
}

async function fetchTokenHolders({ contractAddress, holderLimit }) {
  const response = await fetch(
    `${tonApi}/jettons/${contractAddress}/holders?limit=${holderLimit}`
  );
  const data = await response.json();
  // return data.addresses;
  const friendlyData = data.addresses.map((holder) => {
    const addressFriendly = Address.normalize(holder?.owner?.address);
    holder.owner.address = addressFriendly;
    return holder;
  });
  return friendlyData;
}
