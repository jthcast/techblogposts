import ReactQueryClientProvider from '@/providers/ReactQueryClientProvider/ReactQueryClientProvider'
import ThemeProvider from '@/providers/ThemeProvider/ThemeProvider'
import { palette } from '@/providers/ThemeProvider/palette'
import { locales } from '@/libs/i18n/i18n'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { Noto_Sans_KR } from 'next/font/google'

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

export const viewport = {
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

export default function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  if (!locales.includes(locale)) notFound()

  const messages = useMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={notoSansKr.className}>
        <ThemeProvider />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
