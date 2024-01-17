export const routes = {
  root: '/',
  termsService: '/terms/service',
  termsPrivacy: '/terms/privacy',
  mypage: '/mypage',
  landingError: '/landing/error',
  bookmarks: '/bookmarks',
  blogs: '/blogs',
  '...rest': '/:...rest',
} as const
