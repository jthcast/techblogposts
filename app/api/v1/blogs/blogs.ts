import { GetBlogsResponse } from '@/app/api/v1/blogs/blogsTypes'
import { customFetch } from '@/libs/fetch/fetch'

export async function getBlogs(): Promise<GetBlogsResponse> {
  return await customFetch({
    version: 'v1',
    path: `/blogs`,
  })
}
