/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  output: 'export',
  basePath: '/my-recipes-app',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
