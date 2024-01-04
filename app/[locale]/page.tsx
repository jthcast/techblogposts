'use client'

import { getPosts, putPostsViewCount } from '@/app/api/v1/posts/posts'
import { Observer } from '@/components/atom/Observer/Observer'
import { queryKeys } from '@/providers/ReactQueryClientProvider/ReactQueryClientProvider'
import { useMutation, useSuspenseInfiniteQuery } from '@tanstack/react-query'
import * as Post from '@/components/atom/Post/Post'
import * as Separator from '@/components/atom/Separator/Separator'
import * as styles from '@/app/[locale]/page.css'
import { ExternalLink } from '@/components/atom/ExternalLink/ExternalLink'
import { Fragment } from 'react'

export default function LocalePage() {
  const { data, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery({
    queryKey: queryKeys.getPosts({}),
    queryFn: ({ pageParam }) => getPosts({ cursor: pageParam }),
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.cursor,
  })

  const { mutate: postsViewCount } = useMutation({
    mutationFn: putPostsViewCount,
  })

  return (
    <main>
      <section className={styles.section}>
        {data?.pages.length > 0 && (
          <Post.List>
            {data?.pages.map(({ posts }, pageIndex) =>
              posts.map(({ _source }, postIndex) => {
                const { company, id, publishDate, title, viewCount } = _source
                const isLastItem =
                  pageIndex + 1 === data?.pages.length &&
                  postIndex + 1 === posts.length

                return (
                  <Fragment key={id}>
                    <Post.Item>
                      <ExternalLink
                        href={id}
                        aria-label={title}
                        onClick={() => postsViewCount({ id })}
                        onAuxClick={() => postsViewCount({ id })}
                        title={title}
                      >
                        <Post.Title>{title}</Post.Title>
                      </ExternalLink>
                      <Post.Content>
                        <Post.LeftContent>
                          <Post.CompanyIcon company={company} />
                          <Post.Company>{company}</Post.Company>
                        </Post.LeftContent>
                        <Post.RightContent>
                          <Post.Time time={publishDate} />
                          <Post.ViewCount>{viewCount}</Post.ViewCount>
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
