"use client";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

export default function WalletProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConnectionProvider endpoint="https://api.devnet.solana.com">
      <WalletProvider wallets={[]} autoConnect>
        {/* <WalletModalProvider>
          <div
            style={{
              display: "flex",
              padding: 20,
            }}
          >
            <WalletMultiButton />
            <WalletDisconnectButton />
          </div>
        </WalletModalProvider> */}
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
}
