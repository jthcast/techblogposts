import { locales } from '@/libs/i18n/i18n'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

interface LocaleLayoutProps {
  children?: ReactNode
  params: {
    locale: string
  }
}

export default function RootLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  if (!locales.includes(locale)) notFound()

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  )
}
