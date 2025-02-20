/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/uploads/**",
      },
      {
        // Put production in here when ready
        protocol: "https",
        hostname: "myapp.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig; // ✅ Keep export default for .mjs format



