/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["image.tmdb.org", "lh3.googleusercontent.com"],
  },
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
