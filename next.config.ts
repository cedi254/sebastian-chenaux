import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [640, 1280],
    imageSizes: [320],
  },
  poweredByHeader: false,
};

export default nextConfig;
