import { PrivateRoute } from '@/components/PrivateRoute/PrivateRoute'
import { ReactNode } from 'react'

export default function MypageLayout({ children }: { children: ReactNode }) {
  return <PrivateRoute>{children}</PrivateRoute>
}
