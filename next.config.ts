
/** @type {import('next').NextConfig} */
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {

  experimental: {
    optimizeCss: true,
    useCache: true,
     cacheLife: {
      days: {
        stale: 3600, // 1 hour
        revalidate: 900, // 15 minutes
        expire: 86400, // 1 day
      },
    },
  },

  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],

    remotePatterns: [],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withNextIntl(nextConfig);
