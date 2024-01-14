'use client'

import * as styles from '@/app/[locale]/mypage/page.css'
import { useTranslations } from 'next-intl'
import { signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/atom/Button/Button'
import { format, formatISO } from 'date-fns'
import { useMutation } from '@tanstack/react-query'
import { deleteAuth } from '@/app/api/v1/auth/auth'

export default function MypagePage() {
  const t = useTranslations()
  const { data } = useSession()

  const withdraw = () => {
    signOut()
  }

  const { mutate: deleteAccount } = useMutation({
    mutationFn: deleteAuth,
    onSuccess: withdraw,
  })

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h1 className={styles.title}>{t('MypagePage.title')}</h1>
        <div className={styles.items}>
          <div className={styles.item}>
            <h3 className={styles.subTitle}>{t('MypagePage.email')}</h3>
            <p>
              <span>{data?.user.email}</span>
            </p>
          </div>
          {data?.user.creationTime && (
            <div className={styles.item}>
              <h3 className={styles.subTitle}>{t('MypagePage.createdAt')}</h3>
              <p>
                <time dateTime={formatISO(new Date(data?.user.creationTime))}>
                  {format(
                    new Date(data?.user.creationTime),
                    'yyyy-MM-dd HH:mm:ss',
                  )}
                </time>
              </p>
            </div>
          )}
          {data?.user.providerId && (
            <div className={styles.item}>
              <h3 className={styles.subTitle}>{t('MypagePage.provider')}</h3>
              <p>
                <span>{data?.user.providerId}</span>
              </p>
            </div>
          )}
        </div>
        <Button color="destructive" isGhost onClick={() => deleteAccount()}>
          {t('MypagePage.withdraw')}
        </Button>
      </section>
    </main>
  )
}