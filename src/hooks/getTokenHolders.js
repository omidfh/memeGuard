import { useQuery } from "@tanstack/react-query";
import { tonApi, holderLimit } from "../apiConfig";
import { Address } from "@ton/core";

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
  // return data.addresses;
  const friendlyData = data.addresses.map((holder) => {
    const addressFriendly = Address.normalize(holder?.owner?.address);
    holder.owner.address = addressFriendly;
    return holder;
  });
  return friendlyData;
}

// const friendlyData = data.addresses.map(holder => {
//     const addressFriendly = Address.parse(holder.owner.address)
//     holder.owner.address = addressFriendly
//     return holder;
// });
