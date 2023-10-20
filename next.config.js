/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/sign-in',
        destination: '/api/auth/login',
        permanent: true,
      },
      {
        source: '/sign-up',
        destination: '/api/auth/register',
        permanent: true,
      },
      {
        source: '/sign-out',
        destination: '/api/auth/logout',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },

  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, webpack }
  ) => {
    config.resolve.alias.canvas = false
    config.resolve.alias.encoding = false
    return config
  },
  i18n: {
    locales: ['en-US', 'pt-BR'],
    defaultLocale: 'en-US',
    domains: [
      {
        domain: 'mypdfgenius.com',
        defaultLocale: 'en-US',
      },
      {
        domain: 'mypdfgenius.com.br',
        defaultLocale: 'pt-BR',
      },
    ],
  },
}

module.exports = nextConfig
