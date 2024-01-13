import { ReactNode } from 'react'
import { routes } from '@/constants/routes'
import { RedirectType, redirect } from 'next/navigation'
import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'

interface PrivateRouteProps {
  children?: ReactNode
}

export async function PrivateRoute({ children }: PrivateRouteProps) {
  const session = await auth()

  if (!session) {
    return redirect(routes.root, RedirectType.replace)
  }

  if (session) {
    return <SessionProvider session={session}>{children}</SessionProvider>
  }
}
