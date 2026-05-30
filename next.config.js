/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Set this to your repo name if deploying to username.github.io/repo-name
  // basePath: "/my-blog",
  // assetPrefix: "/my-blog/",
};

module.exports = nextConfig;
