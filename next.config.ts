import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      }, {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
      }, {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
      }
    ],
  }
};

export default nextConfig;