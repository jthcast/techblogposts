import { NOT_EXIST_ID_TOKEN, UNAUTHORIZED } from '@/app/api/errorCodes'
import { auth, firebaseConfig } from '@/auth'
import { customFetch } from '@/libs/fetch/fetch'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await auth()

  if (!session) {
    const response = {
      isAuthenticated: false,
      isMember: false,
    }

    return NextResponse.json({ ...response })
  }

  const response = {
    isAuthenticated: true,
    isMember: true,
    user: {
      email: session?.user.email,
      creationTime: session?.user.creationTime,
      providerId: session?.user.providerId,
      uid: session?.user.uid,
    },
  }

  return NextResponse.json({ ...response })
}

export async function DELETE() {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ code: UNAUTHORIZED }, { status: 401 })
  }

  const { id_token: idToken } = await postIdToken({
    refreshToken: session.user.refreshToken || '',
  })

  if (!idToken) {
    return NextResponse.json({ code: NOT_EXIST_ID_TOKEN }, { status: 400 })
  }

  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${firebaseConfig.apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify({ idToken }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  if (response.status === 200) {
    return new Response(null, { status: 204 })
  }
}

interface PostIdTokenRequest {
  refreshToken: string
}

interface PostIdTokenResponse {
  access_token: string
  expires_in: string
  token_type: string
  refresh_token: string
  id_token: string
  user_id: string
  project_id: string
}

async function postIdToken({
  refreshToken,
}: PostIdTokenRequest): Promise<PostIdTokenResponse> {
  return await customFetch(
    {
      url: `https://securetoken.googleapis.com/v1/token?key=${firebaseConfig.apiKey}`,
    },
    {
      method: 'POST',
      body: JSON.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
}
