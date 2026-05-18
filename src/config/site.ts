export const SITE_URL = 'https://www.pbhotelsconsulting.com'
export const SITE_NAME = 'PB Hotel Consulting'
export const OG_IMAGE = `${SITE_URL}/images/ic_pb_logo.png`

export const SUPPORTED_LOCALES = ['en', 'fr', 'es'] as const
export type AppLocale = (typeof SUPPORTED_LOCALES)[number]
export const DEFAULT_LOCALE: AppLocale = 'en'

const OG_LOCALE: Record<AppLocale, string> = {
  en: 'en_US',
  fr: 'fr_FR',
  es: 'es_ES',
}

export function isAppLocale(value: string): value is AppLocale {
  return SUPPORTED_LOCALES.includes(value as AppLocale)
}

export function localePath(locale: AppLocale): string {
  return `/${locale}`
}

export function localizedUrl(locale: AppLocale): string {
  return `${SITE_URL}${localePath(locale)}`
}

export function getOgLocale(locale: AppLocale): string {
  return OG_LOCALE[locale]
}
