import { customFetch } from '@/libs/fetch/fetch'

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
