import { PrivateRoute } from '@/components/atom/PrivateRoute/PrivateRoute'
import { ReactNode } from 'react'

export default function MypageLayout({ children }: { children: ReactNode }) {
  return <PrivateRoute>{children}</PrivateRoute>
}
