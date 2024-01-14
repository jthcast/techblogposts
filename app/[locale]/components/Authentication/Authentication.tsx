import { LoginDialog } from '@/app/[locale]/components/Authentication/LoginDialog/LoginDialog'
import { LogoutButton } from '@/app/[locale]/components/Authentication/LogoutButton/LogoutButton'
import { auth } from '@/auth'

export async function Authentication() {
  const session = await auth()

  return (
    <>
      {!session && <LoginDialog />}
      {session && <LogoutButton />}
    </>
  )
}
