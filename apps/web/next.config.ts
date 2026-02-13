import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Ensure env vars are validated at build time */
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
