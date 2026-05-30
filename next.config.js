/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Repo is K3S3l7/my-blog so the site lives at /my-blog
  basePath: "/my-blog",
  assetPrefix: "/my-blog/",
};

module.exports = nextConfig;
