'use client'

import { queryKeys } from '@/providers/ReactQueryClientProvider/ReactQueryClientProvider'
import { useSuspenseQuery } from '@tanstack/react-query'
import * as styles from '@/app/[locale]/blogs/page.css'
import { ExternalLink } from '@/components/atom/ExternalLink/ExternalLink'
import { getBlogs } from '@/app/api/v1/blogs/blogs'
import * as Post from '@/components/atom/Post/Post'
import { Link } from '@/components/atom/Link/Link'
import { useTranslations } from 'next-intl'

export default function BlogsPage() {
  const t = useTranslations()

  const { data, error } = useSuspenseQuery({
    queryKey: queryKeys.getBlogs(),
    queryFn: getBlogs,
  })

  if (error) {
    throw error
  }

  return (
    <main className={styles.main}>
      {data?.blogs && (
        <section className={styles.blogsSection}>
          <h1 className={styles.title}>
            {t.rich('BlogsPage.title', {
              blogCount: (chunks) => (
                <span className={styles.blogCount}>{chunks}</span>
              ),
              count: data.blogs.length,
            })}
          </h1>
          {!!data.blogs.length && (
            <ul className={styles.list}>
              {data.blogs.map(({ _source }) => {
                const { id, title } = _source

                return (
                  <li key={id} className={styles.item}>
                    <ExternalLink href={id}>
                      <div className={styles.company}>
                        <Post.CompanyIcon company={title} />
                        <span>{title}</span>
                      </div>
                    </ExternalLink>
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      )}
      <section className={styles.contactSection}>
        <h3 className={styles.contactTitle}>{t('BlogsPage.contactTitle')}</h3>
        <p>{t('BlogsPage.contactDescription')}</p>
        <Link
          isButton
          color="accentPrimary"
          href="mailto:jthcast@gmail.com"
          aria-label="mail"
        >
          {t('BlogsPage.contactButton')}
        </Link>
      </section>
    </main>
  )
}
