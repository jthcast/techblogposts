import * as styles from '@/app/[locale]/terms/privacy/page.css'
import { useTranslations } from 'next-intl'

export default function TermsPrivacyPage() {
  const t = useTranslations()

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h1 className={styles.title}>{t('TermsPrivacyPage.title')}</h1>
        <div>
          <h2 className={styles.subTitle}>
            {t('TermsPrivacyPage.aboutPrivacyPolicyTitle')}
          </h2>
          <p>{t('TermsPrivacyPage.aboutPrivacyPolicyDescription1')}</p>
          <p>{t('TermsPrivacyPage.aboutPrivacyPolicyDescription2')}</p>
          <p>{t('TermsPrivacyPage.aboutPrivacyPolicyDescription3')}</p>
          <p>{t('TermsPrivacyPage.aboutPrivacyPolicyDescription4')}</p>
        </div>
        <div>
          <h2 className={styles.subTitle}>
            {t('TermsPrivacyPage.collectPrivacyTitle')}
          </h2>
          <p>{t('TermsPrivacyPage.collectPrivacyDescription1')}</p>
          <p>{t('TermsPrivacyPage.collectPrivacyDescription2')}</p>
          <p>{t('TermsPrivacyPage.collectPrivacyDescription3')}</p>
          <p>{t('TermsPrivacyPage.collectPrivacyDescription4')}</p>
          <p>{t('TermsPrivacyPage.collectPrivacyDescription5')}</p>
          <p>{t('TermsPrivacyPage.collectPrivacyDescription6')}</p>
          <p>{t('TermsPrivacyPage.collectPrivacyDescription7')}</p>
          <p>{t('TermsPrivacyPage.collectPrivacyDescription8')}</p>
          <p>{t('TermsPrivacyPage.collectPrivacyDescription9')}</p>
          <p>{t('TermsPrivacyPage.collectPrivacyDescription10')}</p>
          <p>{t('TermsPrivacyPage.collectPrivacyDescription11')}</p>
          <p>{t('TermsPrivacyPage.collectPrivacyDescription12')}</p>
          <p>{t('TermsPrivacyPage.collectPrivacyDescription13')}</p>
          <p>{t('TermsPrivacyPage.collectPrivacyDescription14')}</p>
          <p>{t('TermsPrivacyPage.collectPrivacyDescription15')}</p>
        </div>
        <div>
          <h2 className={styles.subTitle}>
            {t('TermsPrivacyPage.usePrivacyTitle')}
          </h2>
          <p>{t('TermsPrivacyPage.usePrivacyDescription1')}</p>
          <p>{t('TermsPrivacyPage.usePrivacyDescription2')}</p>
          <p>{t('TermsPrivacyPage.usePrivacyDescription3')}</p>
          <p>{t('TermsPrivacyPage.usePrivacyDescription4')}</p>
          <p>{t('TermsPrivacyPage.usePrivacyDescription5')}</p>
          <p>{t('TermsPrivacyPage.usePrivacyDescription6')}</p>
          <p>{t('TermsPrivacyPage.usePrivacyDescription7')}</p>
        </div>
      </section>
    </main>
  )
}
