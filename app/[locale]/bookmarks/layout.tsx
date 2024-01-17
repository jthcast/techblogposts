import { PrivateRoute } from '@/components/PrivateRoute/PrivateRoute'
import { ReactNode } from 'react'

export default function BookmarksLayout({ children }: { children: ReactNode }) {
  return <PrivateRoute>{children}</PrivateRoute>
}
