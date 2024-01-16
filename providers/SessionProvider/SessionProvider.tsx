import { auth } from '@/auth'
import { SessionProvider as PrimitiveSessionProvider } from 'next-auth/react'
import { PropsWithChildren } from 'react'

export async function SessionProvider({ children }: PropsWithChildren) {
  const session = await auth()

  const allowedSession = {
    user: {
      email: session?.user.email,
      creationTime: session?.user.creationTime,
      providerId: session?.user.providerId,
    },
    expires: session?.expires || '',
  }

  return (
    <PrimitiveSessionProvider session={allowedSession}>
      {children}
    </PrimitiveSessionProvider>
  )
}
