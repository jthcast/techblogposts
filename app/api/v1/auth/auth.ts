import { GetAuthResponse } from '@/app/api/v1/auth/authTypes'
import { customFetch } from '@/libs/fetch/fetch'

export async function getAuth(): Promise<GetAuthResponse> {
  return await customFetch({
    version: 'v1',
    path: `/auth`,
  })
}

export async function deleteAuth(): Promise<null> {
  return await customFetch(
    {
      version: 'v1',
      path: `/auth`,
    },
    {
      method: 'DELETE',
    },
  )
}
