import {createI18n} from 'vue-i18n'
import en from '@/translations/en.json'
import es from '@/translations/es.json'
import fr from '@/translations/fr.json'
import {DEFAULT_LOCALE} from '@/config/site'

const messages = {
  en,
  es,
  fr,
}

export const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages,
})
