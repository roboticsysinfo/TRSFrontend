/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['ik.imagekit.io', "cdn-icons-png.flaticon.com"], // ✅ Allow external image domain
  },
};

module.exports = nextConfig;
