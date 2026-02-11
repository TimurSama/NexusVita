/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  transpilePackages: [],
  // Exclude presentation folder from build
  webpack: (config, { isServer }) => {
    // Ignore presentation folder completely
    config.module.rules.push({
      test: /presentation\/.*\.(ts|tsx|js|jsx)$/,
      use: 'ignore-loader',
    })
    return config
  },
  // Disable static optimization for demo and presentation pages
  experimental: {
    isrMemoryCacheSize: 0,
  },
}

module.exports = nextConfig


