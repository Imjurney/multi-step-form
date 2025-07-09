import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  compiler: {
    emotion: true,
  },
  optimizeFonts: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Link',
            value:
              '</https://static.toss.im/tps/main.css>; rel=preload; as=style',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
