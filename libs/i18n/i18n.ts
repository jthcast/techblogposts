import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`@/libs/i18n/messages/${locale}.json`)).default,
}))

export const locales = ['en', 'ko']
export const defaultLocale = 'en'
