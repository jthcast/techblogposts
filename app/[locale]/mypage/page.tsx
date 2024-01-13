'use client'

import * as styles from '@/app/[locale]/mypage/page.css'
import { useTranslations } from 'next-intl'
import { useSession } from 'next-auth/react'

export default function MypagePage() {
  const t = useTranslations()
  const { data } = useSession()

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h1 className={styles.title}>{t('MypagePage.title')}</h1>
        <div>
          <h3 className={styles.subTitle}>{t('MypagePage.email')}</h3>
          <p>
            <span>{data?.user.email}</span>
          </p>
        </div>
      </section>
    </main>
  )
}
