import ReactQueryClientProvider from '@/providers/ReactQueryClientProvider/ReactQueryClientProvider'
import ThemeProvider from '@/providers/ThemeProvider/ThemeProvider'
import { palette } from '@/providers/ThemeProvider/palette'
import { locales } from '@/libs/i18n/i18n'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'
import { NextIntlClientProvider, useMessages, useTranslations } from 'next-intl'
import { Noto_Sans_KR } from 'next/font/google'
import * as Header from '@/components/atom/Header/Header'
import { Metadata, Viewport } from 'next'
import { routes } from '@/constants/routes'
import * as styles from '@/app/[locale]/layout.css'
import { SearchCommandDialog } from '@/app/[locale]/components/SearchCommandDialog/SearchCommandDialog'
import { MenuSheet } from '@/app/[locale]/components/MenuSheet/MenuSheet'
import { Link } from '@/components/atom/Link/Link'

interface RootLayoutProps {
  children?: ReactNode
  params: {
    locale: string
  }
}

const notoSansKr = Noto_Sans_KR({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-kr',
})

export const metadata: Metadata = {
  title: {
    template: '%s | TechBlogPosts',
    default: 'TechBlogPosts',
    absolute: '기술 블로그 모음 - TechBlogPosts',
  },
  description: 'IT 기술 블로그들의 최신 포스트를 한곳에서 보세요.',
}

export const viewport: Viewport = {
  themeColor: [
    {
      media: '(prefers-color-scheme: light)',
      color: palette.light.default.white,
    },
    {
      media: '(prefers-color-scheme: dark)',
      color: palette.dark.default.black,
    },
  ],
}

export default function LocaleLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  if (!locales.includes(locale)) notFound()

  const messages = useMessages()
  const t = useTranslations()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={notoSansKr.className}>
        <ThemeProvider />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ReactQueryClientProvider>
            <Header.Root>
              <Header.LeftContent>
                <Link href={routes.root}>
                  <Header.Title>
                    <Header.Logo />
                    {t('Header.title')}
                  </Header.Title>
                </Link>
              </Header.LeftContent>
            </Header.Root>
            {children}
            <div className={styles.floatingButtonGroup}>
              <SearchCommandDialog />
              <MenuSheet />
            </div>
          </ReactQueryClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
