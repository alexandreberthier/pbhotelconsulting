import './assets/main.css'
import './assets/motion.css'

import {createPinia} from 'pinia'
import {ViteSSG} from 'vite-ssg'
import {watch} from 'vue'
import type {RouteLocationNormalized} from 'vue-router'
import {i18n} from '@/translations/i18n.ts'
import App from './App.vue'
import {routes} from '@/router/routes'
import {useGlobalStore} from '@/stores/globalStore.ts'
import {isAppLocale} from '@/config/site'

function scrollBehavior(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  savedPosition: { left: number; top: number } | null,
) {
  if (savedPosition) {
    return savedPosition
  }

  if (to.hash && typeof document !== 'undefined') {
    const element = document.querySelector(to.hash)
    if (element) {
      const offset = 88
      const elPosition = element.getBoundingClientRect().top + window.scrollY - offset
      return {top: elPosition, behavior: 'smooth' as const}
    }
  }

  return {top: 0, behavior: 'smooth' as const}
}

export const createApp = ViteSSG(
  App,
  {routes, scrollBehavior},
  ({app, router, isClient}) => {
    const pinia = createPinia()
    app.use(pinia)
    app.use(i18n)

    const globalStore = useGlobalStore()

    router.beforeEach((to, _from, next) => {
      const localeParam = to.params.locale
      if (typeof localeParam === 'string' && isAppLocale(localeParam)) {
        globalStore.selectedLanguage = localeParam
        i18n.global.locale.value = localeParam
      }
      next()
    })

    const syncLocaleFromRoute = () => {
      const localeParam = router.currentRoute.value.params.locale
      if (typeof localeParam === 'string' && isAppLocale(localeParam)) {
        globalStore.selectedLanguage = localeParam
        i18n.global.locale.value = localeParam
      }
    }

    router.isReady().then(() => {
      syncLocaleFromRoute()
      globalStore.applyTheme()
    })

    if (isClient) {
      watch(
        () => globalStore.selectedLanguage,
        (newLocale) => {
          i18n.global.locale.value = newLocale

          const currentLocale = router.currentRoute.value.params.locale
          if (currentLocale !== newLocale) {
            router.push({
              name: 'home',
              params: {locale: newLocale},
              hash: router.currentRoute.value.hash,
            })
          }
        },
      )

      watch(
        () => router.currentRoute.value.params.locale,
        (localeParam) => {
          if (typeof localeParam === 'string' && isAppLocale(localeParam)) {
            globalStore.selectedLanguage = localeParam
            i18n.global.locale.value = localeParam
          }
        },
      )
    }
  },
)
