/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ejtbprqsjgnckqbnwjrd.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
      },
      {
        protocol: 'https',
        hostname: 'ugc.production.linktr.ee',
      },
    ],
  },
};

export default nextConfig;