/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "media-hosting.imagekit.io"],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig

