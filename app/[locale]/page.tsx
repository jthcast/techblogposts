import { useTranslations } from 'next-intl'

export default function Root() {
  const t = useTranslations()

  return <h1>{t('RootPage.title')}</h1>
}
