import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.qrserver.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/start", destination: "/launch", permanent: true },
      { source: "/explore", destination: "/books", permanent: true },
      { source: "/projects", destination: "/verify", permanent: true },
      { source: "/seat", destination: "/portfolio", permanent: true },
      { source: "/seat/:path*", destination: "/portfolio/:path*", permanent: true },
      { source: "/arrive", destination: "/", permanent: true },
      { source: "/sol-mint", destination: "/launch", permanent: true },
      { source: "/start/fees", destination: "/launch#fees", permanent: true },
    ];
  },
};

export default nextConfig;
