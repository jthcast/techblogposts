import {
  GetPostsRequest,
  GetPostsResponse,
  GetPostsSearchRequest,
  GetPostsSearchResponse,
  PostPostsViewCountRequest,
  PostPostsViewCountResponse,
} from '@/app/api/v1/posts/postsTypes'
import { customFetch } from '@/libs/fetch/fetch'

export async function getPosts({
  cursor,
}: GetPostsRequest): Promise<GetPostsResponse> {
  return await customFetch({
    version: 'v1',
    path: `/posts`,
    params: { cursor },
  })
}

export async function putPostsViewCount({
  id,
}: PostPostsViewCountRequest): Promise<PostPostsViewCountResponse> {
  return await customFetch(
    {
      version: 'v1',
      path: `/posts/view-count`,
    },
    {
      method: 'PUT',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
}

export async function getPostsSearch({
  query,
}: GetPostsSearchRequest): Promise<GetPostsSearchResponse> {
  return await customFetch({
    version: 'v1',
    path: `/posts/search`,
    params: { query },
  })
}
