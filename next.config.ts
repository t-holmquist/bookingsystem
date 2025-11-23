import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "feihbqwfkqtvscctqckw.supabase.co",
      },
    ],
  },
}

export default nextConfig
