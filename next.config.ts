import type { NextConfig } from "next";
const webpack = require("webpack");
const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
    };

    return config;
  },
};

export default nextConfig;
