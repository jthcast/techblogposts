import { auth } from '@/auth'
import { SessionProvider as PrimitiveSessionProvider } from 'next-auth/react'
import { PropsWithChildren } from 'react'

export async function SessionProvider({ children }: PropsWithChildren) {
  const session = await auth()

  return (
    <PrimitiveSessionProvider session={session}>
      {children}
    </PrimitiveSessionProvider>
  )
}
