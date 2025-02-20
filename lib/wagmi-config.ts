import { http, createConfig, injected } from "wagmi";
// import { mainnet, sepolia } from "wagmi/chains";
import { mainnet } from "wagmi/chains";

// export const config = createConfig({
//   chains: [mainnet, sepolia],
//   transports: {
//     [mainnet.id]: http(``),
//     [sepolia.id]: http(),
//   },
// });

export const config = createConfig({
  chains: [mainnet],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    ),
  },
});

// export const config = createConfig({
//   chains: [mainnet, sepolia],
//   transports: {
//     [mainnet.id]: http(
//       `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
//     ),
//     [sepolia.id]: http(
//       `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
//     ),
//   },
// });
