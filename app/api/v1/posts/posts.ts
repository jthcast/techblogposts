import {
  GetPostsRequest,
  GetPostsResponse,
  GetPostsSearchRequest,
  GetPostsSearchResponse,
  PostPostsViewCountRequest,
  PostPostsViewCountResponse,
  PutPostsBookmarkRequest,
  PutPostsBookmarkResponse,
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

export async function postPostsViewCount({
  id,
}: PostPostsViewCountRequest): Promise<PostPostsViewCountResponse> {
  return await customFetch(
    {
      version: 'v1',
      path: `/posts/view-count`,
    },
    {
      method: 'POST',
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

export async function putPostsBookmark({
  uid,
  parent,
}: PutPostsBookmarkRequest): Promise<PutPostsBookmarkResponse> {
  return await customFetch(
    {
      version: 'v1',
      path: `/posts/bookmark`,
    },
    {
      method: 'PUT',
      body: JSON.stringify({ uid, parent }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
}
