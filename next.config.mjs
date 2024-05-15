/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/tracks",
      },
    ];
  },
};

export default nextConfig;
