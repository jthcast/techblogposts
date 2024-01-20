import { PrivateRoute } from '@/components/atom/PrivateRoute/PrivateRoute'
import { ReactNode } from 'react'

export default function BookmarksLayout({ children }: { children: ReactNode }) {
  return <PrivateRoute>{children}</PrivateRoute>
}
