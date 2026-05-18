import en from '../translations/en.json'
import fr from '../translations/fr.json'
import es from '../translations/es.json'
import {
  DEFAULT_LOCALE,
  getOgLocale,
  localizedUrl,
  OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  SUPPORTED_LOCALES,
  type AppLocale,
} from './site'

const seoByLocale: Record<AppLocale, { title: string; description: string; jsonLdDescription: string }> = {
  en: en.seo,
  fr: fr.seo,
  es: es.seo,
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
}

export function injectSeoIntoHtml(html: string, locale: AppLocale): string {
  const seo = seoByLocale[locale]
  const canonical = localizedUrl(locale)
  const title = escapeAttr(seo.title)
  const description = escapeAttr(seo.description)

  const alternates = SUPPORTED_LOCALES.map(
    (code) => `<link rel="alternate" hreflang="${code}" href="${localizedUrl(code)}">`,
  ).join('')

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: OG_IMAGE,
        description: seo.jsonLdDescription,
        email: 'doctor@pbhotelconsulting.com',
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
  }).replace(/</g, '\\u003c')

  const headExtras = [
    `<link rel="canonical" href="${canonical}">`,
    alternates,
    `<link rel="alternate" hreflang="x-default" href="${localizedUrl(DEFAULT_LOCALE)}">`,
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${description}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:image" content="${OG_IMAGE}">`,
    `<meta property="og:site_name" content="${escapeAttr(SITE_NAME)}">`,
    `<meta property="og:locale" content="${getOgLocale(locale)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${title}">`,
    `<meta name="twitter:description" content="${description}">`,
    `<meta name="twitter:image" content="${OG_IMAGE}">`,
    `<script type="application/ld+json" id="organization-json-ld">${jsonLd}<\/script>`,
  ].join('')

  return html
    .replace(/<html[^>]*>/, `<html lang="${locale}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*">/,
      `<meta name="description" content="${description}">`,
    )
    .replace('</head>', `${headExtras}</head>`)
}

export function localeFromRoute(route: string): AppLocale | null {
  const segment = route.replace(/^\//, '').split('/')[0]
  if (segment === 'en' || segment === 'fr' || segment === 'es') {
    return segment
  }
  return null
}
