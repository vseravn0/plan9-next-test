/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env:{
    VERSION:process.env.VERSION
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/books',
        basePath: false,
        permanent: false
      }
    ]
  }
}

module.exports = nextConfig
