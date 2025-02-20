"use client";

import ConnectEthWallet from "@/components/ConnectEthWallet";
import TotalBalance from "@/components/TotalBalance";
import TotalSupply from "@/components/TotalSupply";
import { Button } from "@/components/ui/button";
import { WalletOptions } from "@/components/WalletOptions";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import ConnectEthWallet from "@/components/ConnectEthWallet";
// import { Profile } from "@/components/Profile";
import React from "react";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";

const EthPage = () => {
  const { address } = useAccount();

  return (
    <div>
      <h1>ETH Page</h1>
      <ConnectEthWallet />
      {/* <TotalBalance /> */}
      <TotalBalance />
      <TotalSupply />
    </div>
  );
};

export default EthPage;
