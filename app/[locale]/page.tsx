'use client'

import { getPosts } from '@/app/api/v1/posts/posts'
import { Observer } from '@/components/atom/Observer/Observer'
import { queryKeys } from '@/providers/ReactQueryClientProvider/ReactQueryClientProvider'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
// import { useTranslations } from 'next-intl'
import * as Post from '@/components/atom/Post/Post'
import * as styles from '@/app/[locale]/page.css'
import { ExternalLink } from '@/components/atom/ExternalLink/ExternalLink'

export default function Root() {
  // const t = useTranslations()

  const { data, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery({
    queryKey: queryKeys.getPosts({}),
    queryFn: ({ pageParam }) => getPosts({ cursor: pageParam }),
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.cursor,
  })

  return (
    <main>
      <section className={styles.section}>
        {data?.pages.length > 0 && (
          <Post.List>
            {data?.pages.map(({ posts }) =>
              posts.map((post) => {
                const { company, id, publishDate, title, viewCount } =
                  post._source
                // const bookmarkCount = post.inner_hits.bookmark.hits.total.value

                return (
                  <Post.Item key={id}>
                    <ExternalLink
                      href={id}
                      aria-label={title}
                      // onClick={clickHandling}
                      // onAuxClick={clickHandling}
                      title={title}
                    >
                      <Post.Title>{title}</Post.Title>
                    </ExternalLink>
                    <Post.Content>
                      <Post.LeftContent>
                        {/* <Post.CompanyIcon company={company} /> */}
                        <Post.Company>{company}</Post.Company>
                      </Post.LeftContent>
                      <Post.RightContent>
                        <Post.Time time={publishDate} />
                        <Post.ViewCount>{viewCount}</Post.ViewCount>
                        {/* <Post.Bookmark id={id} /> */}
                      </Post.RightContent>
                    </Post.Content>
                  </Post.Item>
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
