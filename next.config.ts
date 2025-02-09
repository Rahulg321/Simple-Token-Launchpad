import type { NextConfig } from "next";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";

const nextConfig: NextConfig = {
  /* config options here */
 webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(new NodePolyfillPlugin());
    }
    return config;
  },
};

export default nextConfig;
