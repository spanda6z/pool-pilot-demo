import { defineChain } from "viem";

/** Robinhood Chain — Pool Pilot production network */
export const robinhoodChain = defineChain({
  id: 4663,
  name: "Robinhood Chain",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        process.env.NEXT_PUBLIC_RPC_URL ||
          "https://rpc.mainnet.chain.robinhood.com",
      ],
    },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url:
        process.env.NEXT_PUBLIC_EXPLORER ||
        "https://robinhoodchain.blockscout.com",
    },
  },
  testnet: false,
});

export const TARGET_CHAIN_ID = 4663 as const;
