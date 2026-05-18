import {computed} from 'vue'
import {useRoute} from 'vue-router'
import {DEFAULT_LOCALE, isAppLocale, type AppLocale} from '@/config/site'

export function useAppLocale() {
  const route = useRoute()

  const currentLocale = computed((): AppLocale => {
    const locale = route.params.locale
    if (typeof locale === 'string' && isAppLocale(locale)) {
      return locale
    }
    return DEFAULT_LOCALE
  })

  return {currentLocale}
}
