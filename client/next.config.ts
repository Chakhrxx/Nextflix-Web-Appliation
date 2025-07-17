/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    unoptimized: false,
    domains: [
      "image.tmdb.org",
      "lh3.googleusercontent.com",
      "m.media-amazon.com",
    ],
  },
};

export default nextConfig;
