import ReactQueryClientProvider from '@/app/providers/ReactQueryClientProvider/ReactQueryClientProvider'
import ThemeProvider from '@/app/providers/ThemeProvider/ThemeProvider'
import { palette } from '@/app/providers/ThemeProvider/palette'
import { notoSansKR } from '@/app/providers/ThemeProvider/typography'
import { locales } from '@/libs/i18n/i18n'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

interface RootLayoutProps {
  children?: ReactNode
  params: {
    locale: string
  }
}

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

  return (
    <html lang={locale}>
      <body className={notoSansKR.variable}>
        <ThemeProvider />
        <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
      </body>
    </html>
  )
}
