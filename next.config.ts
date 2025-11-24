import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      resolveAlias: {
        // Exclude problematic test dependencies from thread-stream
        'tap': false,
        'tape': false,
        'desm': false,
        'fastbench': false,
        'pino-elasticsearch': false,
        'why-is-node-running': false,
      },
    },
  },
};

export default nextConfig;