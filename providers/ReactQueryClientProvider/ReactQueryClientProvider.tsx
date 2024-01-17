'use client'

import { ReactNode, useState } from 'react'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import {
  QueryClient,
  QueryKey,
  QueryObserverOptions,
  Updater,
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
  const [{ queryClientState, persister }] = useState(() => {
    const primitivePersister = createSyncStoragePersister({
      storage: typeof window === 'undefined' ? undefined : window.localStorage,
    })

    return { queryClientState: queryClient, persister: primitivePersister }
  })

  return (
    <PersistQueryClientProvider
      client={queryClientState}
      persistOptions={{ persister }}
    >
      {children}
      <ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
    </PersistQueryClientProvider>
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
