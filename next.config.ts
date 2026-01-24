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
      // MinIO (Zeabur) - Public endpoint (standard HTTPS)
      {
        protocol: 'https',
        hostname: 'gycc-objects.zeabur.app',
      },
      // MinIO (Zeabur) - Private endpoint (for internal services)
      {
        protocol: 'http',
        hostname: 'minio.zeabur.internal',
        port: '9000',
      },
    ],
  },
};

export default nextConfig;
