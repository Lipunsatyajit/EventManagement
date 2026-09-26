import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  basePath: "/EventManagement",

  assetPrefix: "/EventManagement/",

  images: {
    unoptimized: true,
  },

  trailingSlash: true,
};

export default nextConfig;