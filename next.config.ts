import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gycc-2023.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'gycc-2021.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'gycc-2020.s3.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
