/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Enable standalone output for Docker
  output: 'standalone',
  
  // Performance optimizations
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_APP_NAME: 'Mad Unicorn Voting Platform',
    NEXT_PUBLIC_APP_VERSION: '1.0.0',
  },
};

module.exports = nextConfig;