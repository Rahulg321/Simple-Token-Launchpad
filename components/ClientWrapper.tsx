"use client";

import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WalletProviderWrapper from "@/components/WalletProviderWrapper";
import { Toaster } from "@/components/ui/toaster";
import { config } from "@/lib/wagmi-config";
import React from "react";

// Initialize QueryClient outside the component to avoid re-creation on every render
const queryClient = new QueryClient();

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletProviderWrapper>
          {children}
          <Toaster />
        </WalletProviderWrapper>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
