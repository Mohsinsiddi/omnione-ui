"use client";

import * as React from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  darkTheme,
  midnightTheme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
  phantomWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  goerli,
  sepolia,
  polygonMumbai,
  arbitrumGoerli,
  celoAlfajores,
  baseGoerli,
  mantleTestnet,
  bscTestnet,
  zetachainAthensTestnet,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    goerli,
    sepolia,
    polygonMumbai,
    arbitrumGoerli,
    celoAlfajores,
    baseGoerli,
    mantleTestnet,
    bscTestnet,
    zetachainAthensTestnet,
  ],
  [publicProvider()]
);

const projectId = "b03d8037151435cdd2e2d20096d46628";

const { wallets } = getDefaultWallets({
  appName: "RainbowKit demo",
  projectId,
  chains,
});

const demoAppInfo = {
  appName: "Rainbowkit Demo",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
      phantomWallet({ chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export function EthereumProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        appInfo={demoAppInfo}
        modalSize="wide"
        theme={darkTheme({
          borderRadius: "medium",
          fontStack: "system",
        })}
        coolMode
      >
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
