"use client";

import React from "react";
import { useReadContract } from "wagmi";

import { contract } from "./abi";

const TotalBalance = () => {
  //   const {} = useReadContract({
  //     address: contract.address,
  //   });

  const { data, isLoading, error } = useReadContract({
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    abi: [
      {
        constant: true,
        inputs: [{ name: "who", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "balanceOf",
    args: ["0x587EFaEe4f308aB2795ca35A27Dff8c1dfAF9e3f"],
  });

  if (isLoading) return <div>Loading Total Balance...</div>;

  if (error) {
    console.log("Error getting Total Balance...", error);
    return <div>Error getting Total Balance...</div>;
  }

  if (!data) return <div> No Data </div>;

  return (
    <div>
      <h3>Your Total USDT Balance {data.toString()}</h3>
    </div>
  );
};

export default TotalBalance;
