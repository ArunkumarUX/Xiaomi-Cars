/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.cnbj1.fds.api.mi-img.com',
      },
      {
        protocol: 'https',
        hostname: 'www.mi.com',
      },
      {
        protocol: 'https',
        hostname: 'i01.appmifile.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'xiaomiev.com',
      },
      {
        protocol: 'https',
        hostname: 's1.xiaomiev.com',
      },
    ],
  },
}

export default nextConfig
