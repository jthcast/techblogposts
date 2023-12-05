import ReactQueryClientProvider from '@/app/providers/ReactQueryClientProvider/ReactQueryClientProvider'
import ThemeProvider from '@/app/providers/ThemeProvider/ThemeProvider'
import { locales } from '@/libs/i18n/i18n'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

interface RootLayoutProps {
  children?: ReactNode
  params: {
    locale: string
  }
}

export default function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  if (!locales.includes(locale)) notFound()

  return (
    <html lang={locale}>
      <body>
        <ThemeProvider />
        <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
      </body>
    </html>
  )
}
