import { MenuSheet } from '@/app/[locale]/components/MenuSheet/MenuSheet'
import { SessionProvider } from '@/providers/SessionProvider/SessionProvider'

export async function Menu() {
  return (
    <SessionProvider>
      <MenuSheet />
    </SessionProvider>
  )
}
