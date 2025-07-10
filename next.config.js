/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['ik.imagekit.io'], // ✅ Allow external image domain
  },
};

module.exports = nextConfig;
