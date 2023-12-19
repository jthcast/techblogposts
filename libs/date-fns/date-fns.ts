import { enUS, ko } from 'date-fns/locale'

const locales = {
  en: enUS,
  ko: ko,
}

export const getDateFnsLocale = ({ locale }: { locale: string }) => {
  return locales[locale as keyof typeof locales] || locales['en']
}
