'use client'

import { ReactNode } from 'react'
import {
  QueryClient,
  QueryKey,
  QueryObserverOptions,
  Updater,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  GetPostsRequest,
  GetPostsSearchRequest,
} from '@/app/api/v1/posts/postsTypes'
import {
  GetBookmarksPostsRequest,
  GetBookmarksRequest,
} from '@/app/api/v1/bookmarks/bookmarksTypes'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      throwOnError: true,
      staleTime: 30 * 1000,
    },
    mutations: {
      retry: false,
      throwOnError: true,
    },
  },
})

interface ReactQueryClientProvider {
  children: ReactNode
}

export default function ReactQueryClientProvider({
  children,
}: ReactQueryClientProvider) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export const queryKeys = {
  getPosts: (request: GetPostsRequest) => ['getPosts', request],
  getPostsSearch: (request: GetPostsSearchRequest) => [
    'getPostsSearch',
    request,
  ],
  getBlogs: () => ['getBlogs'],
  getBookmarks: (request: GetBookmarksRequest) => ['getBookmarks', request],
  getBookmarksPosts: (request: GetBookmarksPostsRequest) => [
    'getBookmarksPosts',
    request,
  ],
  getAuth: ['getAuth'],
} as const

export function setQueryData<T>({
  queryKey,
  options,
  updater,
}: {
  queryKey: QueryKey
  options: QueryObserverOptions
  updater: Updater<T | undefined, T | undefined>
}) {
  queryClient.setQueryDefaults(queryKey, options)
  queryClient.setQueryData(queryKey, updater)
}
