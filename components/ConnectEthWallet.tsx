"use client";

import React from "react";
import { WalletOptions } from "./WalletOptions";
import Profile from "./Profile";
import { useAccount } from "wagmi";

const ConnectEthWallet = () => {
  const { isConnected, address } = useAccount();
  if (isConnected) return <Profile />;
  return <WalletOptions />;
};

export default ConnectEthWallet;
