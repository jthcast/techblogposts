const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public',
  },
  env: {
    FB_AUTH_API_KEY: process.env.FB_AUTH_API_KEY,
    FB_AUTH_AUTH_DOMAIN: process.env.FB_AUTH_AUTH_DOMAIN,
    FB_AUTH_PROJECT_ID: process.env.FB_AUTH_PROJECT_ID,
    FB_AUTH_STORAGE_BUCKET: process.env.FB_AUTH_STORAGE_BUCKET,
    FB_AUTH_MESSAGING_SENDER_ID: process.env.FB_AUTH_MESSAGING_SENDER_ID,
    FB_AUTH_APP_ID: process.env.FB_AUTH_APP_ID,
    FB_AUTH_MEASUREMENT_ID: process.env.FB_AUTH_MEASUREMENT_ID
  },
  async rewrites() {
    return [
      {
        source: '/rss.xml',
        destination: '/api/rss',
      },
    ]
  }
});
