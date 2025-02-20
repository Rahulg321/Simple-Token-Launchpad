import TokenLaunchpad from "@/components/TokenLaunchpad";
import React from "react";

const HomePage = async () => {
  return (
    <div className="container max-w-2xl mx-auto mt-4">
      <h1>Token Launchpad</h1>
      <TokenLaunchpad></TokenLaunchpad>
    </div>
  );
};

export default HomePage;
