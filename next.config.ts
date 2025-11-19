import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  webpack: (config) => {
    config.ignoreWarnings = [
      {
        module: /node_modules\/swagger-ui-react/,
        message: /UNSAFE_componentWillReceiveProps/,
      },
    ];
    return config;
  },
};

export default nextConfig;
