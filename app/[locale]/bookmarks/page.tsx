'use client'

import { queryKeys } from '@/providers/ReactQueryClientProvider/ReactQueryClientProvider'
import { useQuery } from '@tanstack/react-query'
import * as Post from '@/components/atom/Post/Post'
import * as Separator from '@/components/atom/Separator/Separator'
import * as styles from '@/app/[locale]/page.css'
import { Fragment } from 'react'
import { useSession } from 'next-auth/react'
import {
  getBookmarks,
  getBookmarksPosts,
} from '@/app/api/v1/bookmarks/bookmarks'

export default function BookmarksPage() {
  const { data: sessionData } = useSession()

  const { data: postsData } = useQuery({
    queryKey: queryKeys.getBookmarksPosts({ uid: sessionData?.user.uid! }),
    queryFn: () => getBookmarksPosts({ uid: sessionData?.user.uid! }),
    enabled: !!sessionData?.user.uid,
  })

  const { data: bookmarksData } = useQuery({
    queryKey: queryKeys.getBookmarks({ uid: sessionData?.user.uid! }),
    queryFn: () => getBookmarks({ uid: sessionData?.user.uid! }),
    enabled: !!sessionData?.user.uid,
  })

  return (
    <main>
      <section className={styles.section}>
        {!!postsData?.posts.length && (
          <Post.List>
            {postsData?.posts.map(({ _source }, index) => {
              const { company, id, publishDate, title, viewCount } = _source
              const isLastItem = index + 1 === postsData?.posts.length
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
            })}
          </Post.List>
        )}
      </section>
    </main>
  )
}
