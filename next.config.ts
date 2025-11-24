import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Exclude test files from being bundled
    config.module.rules.push({
      test: /\.test\.(js|mjs|ts|tsx)$/,
      loader: 'ignore-loader',
    });
    
    return config;
  },
  // Tell Next.js to ignore certain patterns during build
  transpilePackages: [],
};

export default nextConfig;