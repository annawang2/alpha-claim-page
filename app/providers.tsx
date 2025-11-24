"use client";

import { ThirdwebProvider } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import type { ReactNode } from "react";

import { mainnet } from "thirdweb/chains"; 
// ⬆️ Change this to whichever chain your ALPHA airdrop contract is on
// e.g. sepolia, base, optimism, polygon, etc.

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!}
      activeChain={mainnet} 
      wallets={[
        createWallet("io.metamask"),   // MetaMask / injected wallets
        createWallet("walletConnect"), // ✅ WalletConnect enabled
      ]}
    >
      {children}
    </ThirdwebProvider>
  );
}
