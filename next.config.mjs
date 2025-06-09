/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'geer-intern-assignment-backend.onrender.com',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
