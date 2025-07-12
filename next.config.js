/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['ik.imagekit.io', 'cdn-icons-png.flaticon.com'],
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap', // 👈 change this to your dynamic sitemap route
      },
    ];
  },
};

module.exports = nextConfig;
