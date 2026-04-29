/** @type {import('next').NextConfig} */
const nextConfig = {
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        pathname: '/**', 
      },
    ],
  },

  
  async redirects() {
    return [
      {
        source: '/allorders',
        destination: '/Orders',
        permanent: true, 
      },
    ];
  },
};

module.exports = nextConfig;