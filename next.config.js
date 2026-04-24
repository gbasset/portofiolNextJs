/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Liens `/me` -> `/me/` et pages exportées en `/me/index.html` avec `next export`
  trailingSlash: true,
};

module.exports = nextConfig;
