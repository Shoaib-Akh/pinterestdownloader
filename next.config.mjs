/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.pinimg.com',
      },
      {
        protocol: 'https',
        hostname: '**.pinterest.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/contact', destination: '/contacts-us', permanent: true },
      { source: '/contacts', destination: '/contacts-us', permanent: true },
    ];
  },
};

export default nextConfig;
