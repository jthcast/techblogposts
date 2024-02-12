import * as styles from '@/app/[locale]/mypage/page.css'
import { format, formatISO } from 'date-fns'
import { auth } from '@/auth'
import { getTranslations } from 'next-intl/server'
import { DeleteAccountButton } from '@/app/[locale]/mypage/components/DeleteAccountButton/DeleteAccountButton'

export default async function MypagePage() {
  const t = await getTranslations()
  const data = await auth()

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h1 className={styles.title}>{t('MypagePage.title')}</h1>
        <div className={styles.items}>
          <div className={styles.item}>
            <h3 className={styles.subTitle}>{t('MypagePage.email')}</h3>
            <p>
              <span>{data?.user?.email}</span>
            </p>
          </div>
          {data?.user?.creationTime && (
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
          {data?.user?.providerId && (
            <div className={styles.item}>
              <h3 className={styles.subTitle}>{t('MypagePage.provider')}</h3>
              <p>
                <span>{data?.user.providerId}</span>
              </p>
            </div>
          )}
        </div>
        <DeleteAccountButton />
      </section>
    </main>
  )
}
