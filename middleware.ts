import { locales, defaultLocale } from '@/libs/i18n/i18n'
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales,
  defaultLocale,
})

export const config = {
  matcher: ['/', '/(ko|en)/:path*'],
}
