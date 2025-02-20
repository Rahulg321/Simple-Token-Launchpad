"use client";

import React from "react";
import { useReadContract } from "wagmi";

const TotalSupply = () => {
  const { data, isLoading, error } = useReadContract({
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    abi: [
      {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [
          {
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "totalSupply",
  });

  if (isLoading) return <div>Loading Total Supply...</div>;
  if (error) return <div>Error getting Total Supply...</div>;

  return (
    <div>
      <h3>TotalSupply:- {data?.toString()}</h3>
    </div>
  );
};

export default TotalSupply;
