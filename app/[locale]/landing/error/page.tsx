'use client'

import * as styles from '@/app/[locale]/landing/error/page.css'
import { Link } from '@/components/atom/Link/Link'
import { routes } from '@/constants/routes'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

export default function LandingErrorPage() {
  const t = useTranslations()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h1 className={styles.title}>{t('LocaleErrorPage.title')}</h1>
        <p className={styles.description}>
          {t('LocaleErrorPage.description')}
          {error && (
            <span>{t('LocaleErrorPage.errorCode', { code: error })}</span>
          )}
        </p>
        <Link href={routes.root} isUnderline color="secondary">
          {t('LocaleErrorPage.homeButton')}
        </Link>
      </section>
    </main>
  )
}
