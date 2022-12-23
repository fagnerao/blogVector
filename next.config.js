/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
}

module.exports = {
  env: {
    baseURL:'https://blog-vector.vercel.app:3001',
   },
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/vector_blog/**',
      },
    ],
  },
}
