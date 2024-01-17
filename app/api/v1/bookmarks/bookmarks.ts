import {
  GetBookmarksRequest,
  GetBookmarksResponse,
} from '@/app/api/v1/bookmarks/bookmarksTypes'
import { customFetch } from '@/libs/fetch/fetch'

export async function getBookmarks({
  uid,
}: GetBookmarksRequest): Promise<GetBookmarksResponse> {
  return await customFetch({
    version: 'v1',
    path: `/bookmarks`,
    params: { uid },
  })
}
