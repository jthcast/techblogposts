import { MenuSheet } from '@/app/[locale]/components/MenuSheet/MenuSheet'
import { SessionProvider } from 'next-auth/react'

export async function Menu() {
  return (
    <SessionProvider>
      <MenuSheet />
    </SessionProvider>
  )
}
