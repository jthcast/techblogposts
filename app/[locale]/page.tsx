'use client'

import { getPosts } from '@/app/api/v1/posts/posts'
import { Observer } from '@/components/atom/Observer/Observer'
import { queryKeys } from '@/providers/ReactQueryClientProvider/ReactQueryClientProvider'
import { useQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query'
import * as Post from '@/components/atom/Post/Post'
import * as Separator from '@/components/atom/Separator/Separator'
import * as styles from '@/app/[locale]/page.css'
import { Fragment } from 'react'
import { useSession } from 'next-auth/react'
import { getBookmarks } from '@/app/api/v1/bookmarks/bookmarks'

export default function LocalePage() {
  const { data: sessionData } = useSession()

  const {
    data: postsData,
    hasNextPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: queryKeys.getPosts({}),
    queryFn: ({ pageParam }) => getPosts({ cursor: pageParam }),
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.cursor,
  })

  const { data: bookmarksData } = useQuery({
    queryKey: queryKeys.getBookmarks({ uid: sessionData?.user.uid! }),
    queryFn: () => getBookmarks({ uid: sessionData?.user.uid! }),
    enabled: !!sessionData?.user.uid,
  })

  return (
    <main>
      <section className={styles.section}>
        {postsData?.pages.length > 0 && (
          <Post.List>
            {postsData?.pages.map(({ posts }, pageIndex) =>
              posts.map(({ _source }, postIndex) => {
                const { company, id, publishDate, title, viewCount } = _source
                const isLastItem =
                  pageIndex + 1 === postsData?.pages.length &&
                  postIndex + 1 === posts.length
                const isBookmarked = bookmarksData?.bookmarks.some(
                  ({ _source }) => {
                    const { parent } = _source

                    return parent === id
                  },
                )

                return (
                  <Fragment key={id}>
                    <Post.Item>
                      <Post.Title id={id} title={title}>
                        {title}
                      </Post.Title>
                      <Post.Content>
                        <Post.LeftContent>
                          <Post.CompanyIcon company={company} />
                          <Post.Company>{company}</Post.Company>
                        </Post.LeftContent>
                        <Post.RightContent>
                          <Post.Time time={publishDate} />
                          <Post.ViewCount>{viewCount}</Post.ViewCount>
                          {sessionData?.user.uid && (
                            <Post.Bookmark
                              isBookmarked={isBookmarked}
                              uid={sessionData.user.uid}
                              parent={id}
                            />
                          )}
                        </Post.RightContent>
                      </Post.Content>
                    </Post.Item>
                    {!isLastItem && <Separator.Separator />}
                  </Fragment>
                )
              }),
            )}
          </Post.List>
        )}
        <Observer callback={fetchNextPage} condition={hasNextPage} />
      </section>
    </main>
  )
}
