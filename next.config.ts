import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
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
      // Google user avatars (for NextAuth)
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
