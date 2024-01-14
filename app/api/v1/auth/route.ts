import { getAuth } from 'firebase/auth'

export const dynamic = 'force-dynamic'

export async function DELETE() {
  const auth = getAuth()
  const user = auth.currentUser

  if (user) {
    user.delete()

    return new Response(null, { status: 204 })
  }
}
