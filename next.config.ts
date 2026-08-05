import type { NextConfig } from "next";
// import createBundleAnalyzer from "@next/bundle-analyzer";

// const withBundleAnalyzer = createBundleAnalyzer({
//   enabled: process.env.ANALYZE === "true",
// });

const nextConfig: NextConfig = {
  images: {
    qualities: [30, 50, 70, 85],
  },
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react", "framer-motion"],
    inlineCss: true,
  },
  turbopack: {
    resolveAlias: {
      "../build/polyfills/polyfill-module": "./lib/modern-polyfill.js",
      "next/dist/build/polyfills/polyfill-module": "./lib/modern-polyfill.js",
    },
  },
};

export default nextConfig;
