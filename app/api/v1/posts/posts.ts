import {
  GetPostsRequest,
  GetPostsResponse,
} from '@/app/api/v1/posts/postsTypes'
import { customFetch } from '@/libs/fetch/fetch'

export async function getPosts({
  cursor,
}: GetPostsRequest): Promise<GetPostsResponse> {
  const response = await customFetch({
    version: 'v1',
    path: `/posts`,
    params: { cursor },
  })

  return response.json()
}
