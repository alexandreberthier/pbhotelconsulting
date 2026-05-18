import {watch} from 'vue'
import {useI18n} from 'vue-i18n'
import {useRoute} from 'vue-router'
import {
  DEFAULT_LOCALE,
  getOgLocale,
  localizedUrl,
  OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  SUPPORTED_LOCALES,
  type AppLocale,
} from '@/config/site'

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, key)
    document.head.appendChild(element)
  }

  element.content = content
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')

  if (!element) {
    element = document.createElement('link')
    element.rel = 'canonical'
    document.head.appendChild(element)
  }

  element.href = href
}

function upsertHreflang(locale: AppLocale | 'x-default', href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${locale}"]`)

  if (!element) {
    element = document.createElement('link')
    element.rel = 'alternate'
    element.hreflang = locale
    document.head.appendChild(element)
  }

  element.href = href
}

function removeManagedHreflang() {
  document.head
      .querySelectorAll('link[rel="alternate"][hreflang]')
      .forEach((element) => element.remove())
}

function upsertJsonLd(data: Record<string, unknown>) {
  const id = 'organization-json-ld'
  let element = document.getElementById(id) as HTMLScriptElement | null

  if (!element) {
    element = document.createElement('script')
    element.id = id
    element.type = 'application/ld+json'
    document.head.appendChild(element)
  }

  element.textContent = JSON.stringify(data)
}

export function useSeo() {
  const {t, locale} = useI18n()
  const route = useRoute()

  function resolveLocale(): AppLocale {
    const param = route.params.locale
    if (typeof param === 'string' && param.length > 0) {
      return param as AppLocale
    }
    return DEFAULT_LOCALE
  }

  function applySeo() {
    const currentLocale = resolveLocale()
    const title = t('seo.title')
    const description = t('seo.description')
    const canonical = localizedUrl(currentLocale)

    document.documentElement.lang = currentLocale
    document.title = title

    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', OG_IMAGE)
    upsertMeta('property', 'og:site_name', SITE_NAME)
    upsertMeta('property', 'og:locale', getOgLocale(currentLocale))
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', OG_IMAGE)

    upsertCanonical(canonical)

    removeManagedHreflang()
    SUPPORTED_LOCALES.forEach((localeCode) => {
      upsertHreflang(localeCode, localizedUrl(localeCode))
    })
    upsertHreflang('x-default', localizedUrl(DEFAULT_LOCALE))

    upsertJsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: SITE_NAME,
          url: SITE_URL,
          logo: OG_IMAGE,
          description: t('seo.jsonLdDescription'),
          email: 'doctor@pbhotelconsulting.com',
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'doctor@pbhotelconsulting.com',
            contactType: 'customer service',
            areaServed: 'Worldwide',
            availableLanguage: ['English', 'Spanish', 'French'],
          },
          sameAs: [
            'https://www.linkedin.com/in/pberthier/',
            'https://x.com/pbhconsulting',
          ],
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: SITE_NAME,
          inLanguage: ['en', 'fr', 'es'],
          publisher: {'@id': `${SITE_URL}/#organization`},
        },
      ],
    })
  }

  watch([locale, () => route.params.locale], applySeo, {immediate: true})
}
