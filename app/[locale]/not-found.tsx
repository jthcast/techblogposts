'use client'

import { Link } from '@/components/atom/Link/Link'
import { useTranslations } from 'next-intl'
import * as styles from '@/app/[locale]/not-found.css'
import { routes } from '@/constants/routes'

export default function NotFoundPage() {
  const t = useTranslations()

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h1 data-content="404" className={styles.title}>
          {t('notFoundPage.title')}
        </h1>
        <p className={styles.description}>{t('notFoundPage.description')}</p>
        <Link href={routes.root} isButton color="accentPrimary">
          {t('notFoundPage.homeButton')}
        </Link>
      </section>
    </main>
  )
}
