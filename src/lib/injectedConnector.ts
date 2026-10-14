"use client";

import { createConnector, type CreateConnectorFn } from "wagmi";
import {
  getAddress,
  numberToHex,
  type Address,
  type Hex,
} from "viem";

type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, listener: (...args: unknown[]) => void) => void;
  removeListener?: (
    event: string,
    listener: (...args: unknown[]) => void
  ) => void;
};

function getProvider(): EthereumProvider | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { ethereum?: EthereumProvider }).ethereum;
}

/**
 * Minimal EIP-1193 injected connector (MetaMask, Rabby, etc.).
 * Does not import @wagmi/connectors — avoids Coinbase/baseAccount → @x402 build failure.
 */
export function injectedConnector(parameters?: {
  shimDisconnect?: boolean;
}): CreateConnectorFn {
  const shimDisconnect = parameters?.shimDisconnect ?? true;

  return createConnector((config) => ({
    id: "injected",
    name: "Browser Wallet",
    type: "injected" as const,

    async setup() {},

    async connect(parameters = {}) {
      const provider = getProvider();
      if (!provider) {
        throw new Error(
          "No injected wallet found. Install MetaMask or another browser wallet."
        );
      }

      const chainId = parameters.chainId;
      const withCapabilities = Boolean(
        "withCapabilities" in parameters && parameters.withCapabilities
      );

      const rawAccounts = (await provider.request({
        method: "eth_requestAccounts",
      })) as string[];

      let currentChainId = await this.getChainId();
      if (chainId && currentChainId !== chainId) {
        try {
          await provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: numberToHex(chainId) }],
          });
          currentChainId = chainId;
        } catch {
          // user rejected or chain not added
        }
      }

      if (shimDisconnect) {
        try {
          config.storage?.setItem("injected.connected", true);
        } catch {
          /* ignore */
        }
      }

      const addresses = rawAccounts.map((a) => getAddress(a)) as Address[];

      if (withCapabilities) {
        return {
          accounts: addresses.map((address) => ({
            address,
            capabilities: {} as Record<string, unknown>,
          })),
          chainId: currentChainId,
        };
      }

      return {
        accounts: addresses,
        chainId: currentChainId,
      };
    },

    async disconnect() {
      if (shimDisconnect) {
        try {
          config.storage?.removeItem("injected.connected");
        } catch {
          /* ignore */
        }
      }
    },

    async getAccounts() {
      const provider = getProvider();
      if (!provider) return [] as Address[];
      const accounts = (await provider.request({
        method: "eth_accounts",
      })) as string[];
      return accounts.map((a) => getAddress(a)) as Address[];
    },

    async getChainId() {
      const provider = getProvider();
      if (!provider) return config.chains[0]?.id ?? 1;
      const hex = (await provider.request({ method: "eth_chainId" })) as Hex;
      return Number.parseInt(hex, 16);
    },

    async getProvider() {
      return getProvider();
    },

    async isAuthorized() {
      if (shimDisconnect) {
        try {
          const connected = await config.storage?.getItem("injected.connected");
          if (!connected) return false;
        } catch {
          return false;
        }
      }
      const accounts = await this.getAccounts();
      return accounts.length > 0;
    },

    onAccountsChanged(accounts) {
      if (accounts.length === 0) {
        this.onDisconnect();
        return;
      }
      config.emitter.emit("change", {
        accounts: accounts.map((a) => getAddress(a)) as Address[],
      });
    },

    onChainChanged(chain) {
      const chainId = Number.parseInt(chain as string, 16);
      config.emitter.emit("change", { chainId });
    },

    onConnect(connectInfo) {
      const info = connectInfo as { chainId: string };
      config.emitter.emit("connect", {
        accounts: [] as Address[],
        chainId: Number.parseInt(info.chainId, 16),
      });
    },

    onDisconnect(_error) {
      config.emitter.emit("disconnect");
    },
  }));
}
