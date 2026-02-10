/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  transpilePackages: [],
  // Exclude presentation folder from build
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/presentation/**'],
    }
    // Exclude presentation from compilation
    config.resolve.alias = {
      ...config.resolve.alias,
    }
    config.module.rules.push({
      test: /presentation\/.*\.(ts|tsx|js|jsx)$/,
      use: 'ignore-loader',
    })
    return config
  },
}

module.exports = nextConfig


