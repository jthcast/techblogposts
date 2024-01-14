import { PropsWithChildren } from 'react'
import { routes } from '@/constants/routes'
import { RedirectType, redirect } from 'next/navigation'
import { auth } from '@/auth'
import { SessionProvider } from '@/providers/SessionProvider/SessionProvider'

export async function PrivateRoute({ children }: PropsWithChildren) {
  const session = await auth()

  if (!session) {
    return redirect(routes.root, RedirectType.replace)
  }

  if (session) {
    return <SessionProvider>{children}</SessionProvider>
  }
}
