import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Next.js 16+ configuration */
  
  // Enable Turbopack filesystem caching for faster development rebuilds
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },

  // Image optimization defaults updated in Next.js 16
  images: {
    minimumCacheTTL: 14400, // 4 hours (default in Next.js 16)
    // Remove 16px from imageSizes as per Next.js 16 defaults
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    // Only use quality 75 by default as per Next.js 16
    qualities: [75],
  },


}

export default nextConfig;
