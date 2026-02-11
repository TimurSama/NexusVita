/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  transpilePackages: [],
  // Disable static optimization for specific routes
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // Exclude presentation folder from build
  webpack: (config, { isServer }) => {
    // Ignore presentation folder completely
    config.module.rules.push({
      test: /presentation\/.*\.(ts|tsx|js|jsx)$/,
      use: 'ignore-loader',
    })
    return config
  },
}

module.exports = nextConfig


