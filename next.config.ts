import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
  remotePatterns: [
  {
    protocol: 'https',
    hostname: 'i.ytimg.com', // YouTube
  },
  {
    protocol: 'https',
    hostname: 'pbs.twimg.com', // Twitter
  },
  {
     protocol: 'https',
     hostname: '**', // Keep the wildcard as a fallback
  }
],
  },
};

export default nextConfig;