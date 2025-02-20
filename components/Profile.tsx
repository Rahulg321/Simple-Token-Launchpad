"use client";

import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import { Button } from "./ui/button";

export default function Profile() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  console.log("first log", ensName);
  console.log("second log", ensAvatar);

  return (
    <div>
      {address && <div>{address}</div>}
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      <Button onClick={() => disconnect()}>Disconnect</Button>
    </div>
  );
}
