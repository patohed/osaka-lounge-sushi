/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/osaka-lounge-sushi' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/osaka-lounge-sushi/' : '',
  trailingSlash: true,
}

module.exports = nextConfig
