/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d1kwz9lny18c3r.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "thefoschini.vtexassets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "timberland.co.za",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
