import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  async rewrites() {
      return [{
        source: '/user/:path*',
        destination: 'http://localhost:4000/api/v1/user/:path*'
      }]
  },
};

export default nextConfig;
