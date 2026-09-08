import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [640, 1080, 1440, 1920, 2560],
    imageSizes: [320, 640],
  },
  poweredByHeader: false,
};

export default nextConfig;
