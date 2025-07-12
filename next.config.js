/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['ik.imagekit.io', 'cdn-icons-png.flaticon.com'],
  },

};

module.exports = nextConfig;
