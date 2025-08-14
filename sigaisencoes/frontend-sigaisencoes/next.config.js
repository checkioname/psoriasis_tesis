/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/clients/:path*',
        destination: 'http://localhost:8080/:path*',
      },
      {
        source: '/api/docs/:path*',
        destination: 'http://localhost:8082/:path*',
      },
    ];
  },
}

module.exports = nextConfig
