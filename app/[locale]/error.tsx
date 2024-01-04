'use client'

import * as styles from '@/app/[locale]/error.css'
import { Button } from '@/components/atom/Button/Button'
import { Redo } from '@/components/atom/Icon'
import { Link } from '@/components/atom/Link/Link'
import { routes } from '@/constants/routes'
import { CustomError } from '@/libs/fetch/fetch'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

interface ErrorProps {
  error: Error & CustomError
  reset: () => void
}

export default function LocaleErrorPage({ error, reset }: ErrorProps) {
  const t = useTranslations()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h1 className={styles.title}>{t('LocaleErrorPage.title')}</h1>
        <p className={styles.description}>
          {t('LocaleErrorPage.description')}
          {error.code && (
            <span>{t('LocaleErrorPage.errorCode', { code: error.code })}</span>
          )}
        </p>
        <Button aria-label={t('LocaleErrorPage.redoButton')} onClick={reset}>
          <Redo />
        </Button>
        <Link href={routes.root} isUnderline color="secondary">
          {t('LocaleErrorPage.homeButton')}
        </Link>
      </section>
    </main>
  )
}
