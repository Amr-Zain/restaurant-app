
/** @type {import('next').NextConfig} */
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {

  experimental: {
    optimizeCss: true,
  },

  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],

    remotePatterns: [],
  },
};

export default withNextIntl(nextConfig);
