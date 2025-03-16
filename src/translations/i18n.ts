import {createI18n} from "vue-i18n";
import en from '@/translations/en.json'
import es from '@/translations/es.json'
import fr from '@/translations/fr.json'

const messages = {
    en: en,
    es: es,
    fr: fr
}

export const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages
})
