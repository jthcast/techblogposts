const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const withNextIntl = require('next-intl/plugin')('./libs/i18n/i18n.ts')

const withVanillaExtract = createVanillaExtractPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/rss.xml',
        destination: '/api/v1/rss',
      },
    ]
  },
}

module.exports = withVanillaExtract(withNextIntl(nextConfig))
