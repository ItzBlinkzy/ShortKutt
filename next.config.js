/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [{source: "/:slug", destination: "/api/link/:slug", permanent: true}]
  }
}

module.exports = nextConfig
