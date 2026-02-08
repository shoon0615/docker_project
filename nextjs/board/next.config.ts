import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  reactCompiler: true,
  // experimental: { ppr: true }  // v15 (Partial Prerendering)
  cacheComponents: true,  // v16
  images: {
    remotePatterns: [
      { 
        protocol: 'https', 
        hostname: 'heropy.dev' 
      },
      {
        protocol: 'https', 
        hostname: 'm.media-amazon.com' // `movie.Poster` 경로의 도메인
      },
      {
        protocol: 'https',
        hostname: '**.example.com',
        port: '80',
        pathname: '/account123/**',
      }
    ]
  },
};

export default nextConfig;
