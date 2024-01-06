import * as styles from '@/app/[locale]/terms/service/page.css'
import { useTranslations } from 'next-intl'

export default function TermsServicePage() {
  const t = useTranslations()

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h1 className={styles.title}>{t('TermsServicePage.title')}</h1>
        <div>
          <h2 className={styles.subTitle}>
            {t('TermsServicePage.aboutTitle')}
          </h2>
          <p>{t('TermsServicePage.aboutDescription1')}</p>
          <p>{t('TermsServicePage.aboutDescription2')}</p>
        </div>
        <div>
          <h2 className={styles.subTitle}>
            {t('TermsServicePage.memberTitle')}
          </h2>
          <p>{t('TermsServicePage.memberDescription1')}</p>
          <p>{t('TermsServicePage.memberDescription2')}</p>
        </div>
        <div>
          <h2 className={styles.subTitle}>
            {t('TermsServicePage.privacyTitle')}
          </h2>
          <p>{t('TermsServicePage.privacyDescription1')}</p>
          <p>{t('TermsServicePage.privacyDescription2')}</p>
        </div>
        <div>
          <h2 className={styles.subTitle}>
            {t('TermsServicePage.serviceTitle')}
          </h2>
          <p>{t('TermsServicePage.serviceDescription1')}</p>
        </div>
        <div>
          <h2 className={styles.subTitle}>{t('TermsServicePage.userTitle')}</h2>
          <p>{t('TermsServicePage.userDescription1')}</p>
        </div>
      </section>
    </main>
  )
}
