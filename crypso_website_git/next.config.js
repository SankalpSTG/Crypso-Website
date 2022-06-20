/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // optimizeFonts: false,
  trailingSlash: true,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ){
    return {
      '/privacy_policy': { page: '/privacy_policy' },
      '/terms_and_conditions': { page: '/terms_and_conditions' },
      '/': { page: '/' },
    }
  }
}

module.exports = nextConfig
