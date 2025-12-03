/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'api.nexusvita.com'],
  },
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3001',
  },
}

module.exports = nextConfig

