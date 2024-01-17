'use client'

import { queryKeys } from '@/providers/ReactQueryClientProvider/ReactQueryClientProvider'
import { useQuery } from '@tanstack/react-query'
import * as Post from '@/components/atom/Post/Post'
import * as Separator from '@/components/atom/Separator/Separator'
import * as Empty from '@/components/atom/Empty/Empty'
import * as styles from '@/app/[locale]/bookmarks/page.css'
import { Fragment } from 'react'
import {
  getBookmarks,
  getBookmarksPosts,
} from '@/app/api/v1/bookmarks/bookmarks'
import { useTranslations } from 'next-intl'
import { getAuth } from '@/app/api/v1/auth/auth'

export default function BookmarksPage() {
  const t = useTranslations()

  const { data } = useQuery({
    queryKey: queryKeys.getAuth,
    queryFn: getAuth,
  })

  const { data: postsData, isFetched } = useQuery({
    queryKey: queryKeys.getBookmarksPosts({ uid: data?.user?.uid! }),
    queryFn: () => getBookmarksPosts({ uid: data?.user?.uid! }),
    enabled: !!data?.user?.uid,
  })

  const { data: bookmarksData } = useQuery({
    queryKey: queryKeys.getBookmarks({ uid: data?.user?.uid! }),
    queryFn: () => getBookmarks({ uid: data?.user?.uid! }),
    enabled: !!data?.user?.uid,
  })

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h1 className={styles.title}>{t('BookmarksPage.title')}</h1>
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
                        {data?.user?.uid && (
                          <Post.Bookmark
                            isBookmarked={isBookmarked}
                            uid={data.user.uid}
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
        {!postsData?.posts.length && isFetched && (
          <Empty.Root>
            <Empty.Content>
              <Empty.Indicator />
              <Empty.Title>{t('BookmarksPage.emptyTitle')}</Empty.Title>
              <Empty.Description>
                {t('BookmarksPage.emptyDescription')}
              </Empty.Description>
            </Empty.Content>
          </Empty.Root>
        )}
      </section>
    </main>
  )
}
