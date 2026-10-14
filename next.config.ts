import type { NextConfig } from "next";
import path from "path";

const emptyStub = path.join(process.cwd(), "src/lib/stubs/empty-client.js");

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
  webpack: (config) => {
    // Belt-and-suspenders: if anything still resolves Coinbase/@x402, stub it.
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@x402/evm": emptyStub,
      "@x402/evm/upto/client": emptyStub,
      "@x402/evm/exact/client": emptyStub,
      "@x402/core": emptyStub,
      "@x402/core/client": emptyStub,
      "@x402/svm": emptyStub,
      "@x402/svm/exact/client": emptyStub,
      "@base-org/account": emptyStub,
      "@coinbase/cdp-sdk": emptyStub,
    };
    return config;
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
